import { connectDB } from "@/lib/config/database";
import User from "@/lib/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

await connectDB()


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        console.log(reqBody)
        const {username, password, email} = reqBody

        const user = await User.findOne({email})
        console.log(user)

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        console.log(salt)
        const hashPass = await bcryptjs.hash(password, salt)
        console.log(hashPass)

        const newUser = new User({
            username,
            email,
            password: hashPass
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({message: "User created successfully", success: true, savedUser})

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}