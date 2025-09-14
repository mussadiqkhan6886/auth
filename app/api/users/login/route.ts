import { connectDB } from "@/lib/config/database";
import User from "@/lib/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"