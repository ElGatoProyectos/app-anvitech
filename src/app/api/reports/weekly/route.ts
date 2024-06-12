import { NextRequest, NextResponse } from "next/server";
import { validationAuthV2 } from "../../utils/handleValidation";
import { dataService } from "@/lib/core/service/data.service";
import { reportService } from "@/lib/core/service/report.service";

export async function POST(request: NextRequest) {
  try {
    const responseAuth = await validationAuthV2(request, "admin");
    if (responseAuth.status !== 200) return responseAuth;

    const body = await request.json();

    const dayBody = Number(body.day);
    const monthBody = Number(body.month);
    const yearBody = Number(body.year);

    const allDays = await dataService.getDaysBetweenMondayAndSaturday(
      dayBody,
      monthBody,
      yearBody
    );

    console.log(allDays);

    const responseData = await reportService.generateReportForWeek(allDays);

    return NextResponse.json(responseData, {
      status: responseData.statusCode,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
