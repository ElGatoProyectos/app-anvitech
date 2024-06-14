import { NextRequest, NextResponse } from "next/server";
import { validationAuthV2 } from "../../utils/handleValidation";
import { scheduleService } from "@/lib/core/service/schedule.service";

export async function GET(request: NextRequest) {
  try {
    const responseAuth = await validationAuthV2(request, "user");
    if (responseAuth.status !== 200) return responseAuth;

    const response = await scheduleService.findAll();

    return NextResponse.json(response.content, {
      status: response.statusCode,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
