import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed. User ID not found.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { address } = body;

    if (!address || typeof address !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Valid address object is required",
        },
        { status: 400 }
      );
    }

    const requiredFields = [
      "fullName",
      "phoneNumber",
      "pincode",
      "area",
      "city",
      "state",
    ];

    for (const field of requiredFields) {
      if (!address[field] || address[field].toString().trim() === "") {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    await connectDB();

    const newAddress = await Address.create({
      ...address,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        newAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding address:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
