import { NextRequest, NextResponse } from "next/server";
import { validationAuthV2 } from "../../utils/handleValidation";
import { reportService } from "@/lib/core/service/report.service";
import { vacationService } from "@/lib/core/service/vacation.service";

export async function POST(request: NextRequest) {
  try {
    const responseAuth = await validationAuthV2(request, "admin");
    if (responseAuth.status !== 200) return responseAuth;
    const body = await request.formData();
    const file = body.get("file") as File;

    const response = await vacationService.registerMassive(file);

    return NextResponse.json(response.content, {
      status: response.statusCode,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}