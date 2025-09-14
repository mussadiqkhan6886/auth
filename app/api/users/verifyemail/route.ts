import { connectDB } from "@/lib/config/database";
import User from "@/lib/model/userModel";
import { NextRequest, NextResponse } from "next/server";

// gt save
await connectDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message: "Verified Successfully", success: true})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}