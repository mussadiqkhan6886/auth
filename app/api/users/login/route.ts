import { connectDB } from "@/lib/config/database";
import User from "@/lib/model/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


await connectDB()

export async function POST(request: Request){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        const findUser = await User.findOne({email})
        console.log(findUser)

        if(!findUser){
            return NextResponse.json({message: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, findUser.password)
        console.log(validPassword)

        const tokenData = {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        console.log(token)

        const response = NextResponse.json({message: "Login Successfully", success: true})

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}