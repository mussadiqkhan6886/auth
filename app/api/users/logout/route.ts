import { NextResponse } from "next/server";

// cookies

export async function GET(){
    try{
        const response = NextResponse.json({message: "Logout Successfully", success: true})

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return response
    
    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}