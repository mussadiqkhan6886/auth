import nodemailer from "nodemailer"
import User from "@/lib/model/userModel"
import bcryptjs from "bcryptjs"


// bcrypt vs bcryptjs

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(hashToken)

       if(emailType === "VERIFY"){
         await User.findByIdAndUpdate(userId, {verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000})
       }else if(emailType === "RESET"){
         await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
       }

       const transporter = nodemailer.createTransport({
        host: ,
        port: ,
        auth: {
            user: '',
            auth: ''
        }
       })

       const mailOptions = {
        from: "mussadiqkhan6886@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "verify your email" : "Change password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email": "Reset your password"}`
       }

       const mailResponse = await transport.sendMail(mailOptions)
       return mailResponse

    } catch (error: any) {
        console.log(error.message)
    }
}