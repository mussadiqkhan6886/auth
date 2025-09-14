import { connectDB } from "@/lib/config/database";
import User from "@/lib/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

await connectDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        const {_id} = await User.find({})

        const user = await User.findOne({forgotPassword: token, forgotPasswordExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const gensalt = await bcryptjs.genSalt(10)
        const newhashed = await bcryptjs.hash(password ,gensalt)

        await User.findByIdAndUpdate(_id,{ password: newhashed})

        user.forgotPassword = undefined
        user.forgotPasswordExpiry = undefined
        await user.save()

        return NextResponse.json({message: "Password Changes successfully Successfully", success: true})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}