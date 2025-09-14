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

       // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
        });

       const mailOptions = {
        from: "mussadiqkhan6886@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "verify your email" : "Change password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email": "Reset your password"}`
       }

       const mailResponse = await transporter.sendMail(mailOptions)
       return mailResponse

    } catch (error: any) {
        console.log(error.message)
    }
}