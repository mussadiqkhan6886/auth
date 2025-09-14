 import { getDataFromToken } from "@/helpers/getDataFromToken";
 import { NextResponse, NextRequest } from "next/server";
 import User from "@/lib/model/userModel";
 import { connectDB } from "@/lib/config/database";

 await connectDB()

 export async function GET(req: NextRequest){
    try {
        const userId = await getDataFromToken(req)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({message: "User Found", success: true, data: user})

    } catch (error: any) {
        return NextResponse.json({err: error.message}, {status: 500})
    }
 }