import prisma from "@/lib/prisma";
import { errorService } from "./errors.service";
import { httpResponse } from "./response.service";

import * as xlsx from "xlsx";

class ReportService {
  async generateReport() {
    try {
      const lastReport = (await this.findLast()) as any;
      let numberPos;
      if (lastReport !== null) {
        const nameSepare = lastReport.name.split(" ");
        numberPos = Number(nameSepare[1]) + 1;
      } else numberPos = 1;

      const dataSet = {
        state: "default",
        name: "Report " + numberPos,
      };
      const report = await prisma.report.create({ data: dataSet });
      return httpResponse.http200("Report created ok", report);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  // async createReportDetail(dataDetail: any, reportId: number, day: string) {
  //   try {
  //     const dataTemporal = {
  //       uuid: "65638685461972376eb766c4261406cfc5f320272dee536c7c0ee8fc94768d71",
  //       checktype: 0,
  //       checktime: "2024-02-07T18:51:46+00:00",
  //       device: {
  //         serial_number: "0300100024030014",
  //         name: "014-MARIACOBOS-LIMANORTE",
  //       },
  //       employee: {
  //         first_name: "ANDERSON ",
  //         last_name: "GALVEZ TICLLACURI",
  //         workno: "70976827",
  //         department: "INTEGRAL PRO SAC - SEDE LIMA NORTE",
  //         job_title: "ASESOR DE VENTAS CAMPO",
  //       },
  //     };

  //     await prisma.detailReport.create({ data: dataDetail });
  //   } catch (error) {
  //     return errorService.handleErrorSchema(error);
  //   }
  // }

  async generateReportDetail(dataGeneralAniz: any[], reportId: number) {
    // todo mapeo de la informacion y registro de la misma en base al id del reporte
  }

  async findAll() {
    try {
      const reports = await prisma.report.findMany();
      return httpResponse.http200("All reports", reports);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  private async findLast() {
    return await prisma.report.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }

  /// not used
  async findDetailReport(id: number) {
    try {
      const details = await prisma.detailReport.findMany({
        where: { report_id: id },
      });
      return httpResponse.http200("All details report", details);
    } catch (error) {
      console.log(error);
      return errorService.handleErrorSchema(error);
    }
  }

  async findReportByWorker(reportId: number, workerDNI: string) {
    try {
      const detail = await prisma.detailReport.findMany({
        where: { report_id: reportId, dni: workerDNI },
      });
      return httpResponse.http200("All details report", detail);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  /// ok
  async updateHours(detailReportId: number, dataHours: any) {
    try {
      const updated = await prisma.detailReport.update({
        where: { id: detailReportId },
        data: {
          hora_inicio: { set: dataHours.hora_inicio },
          hora_inicio_refrigerio: { set: dataHours.hora_inicio_refrigerio },
          hora_fin_refrigerio: { set: dataHours.hora_fin_refrigerio },
          hora_salida: { set: dataHours.hora_salida },
        },
      });
      return httpResponse.http200("Detail updated", updated);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async addIncident(detailReportId: number, incidentId: number) {
    try {
      const updated = await prisma.detailReport.update({
        where: { id: detailReportId },
        data: {
          incident_id: { set: incidentId },
        },
      });
      return httpResponse.http200("Detail updated", updated);
    } catch (error) {
      console.log(error);
      return errorService.handleErrorSchema(error);
    }
  }

  async exportToExcel(data: any) {
    try {
      const dataGeneral = data.map((item: any) => {
        return {
          DNI: item.dni,
          Nombres: item.nombre,
          departamento: item.sede,
          "Fecha reporte": item.fecha_reporte,
          "Hora inicio": item.hora_inicio,
          "Hora inicio refrigerio": item.hora_inicio_refrigerio,
          "Hora fin refrigerio": item.hora_fin_refrigerio,
          "Hora salida": item.hora_salida,
          tadanza: item.tardanza,
          falta: item.falta,
        };
      });

      console.log(dataGeneral);
      const worksheet = xlsx.utils.json_to_sheet(dataGeneral, {
        header: [
          "DNI",
          "Nombres",
          "departamento",
          "Fecha reporte",
          "Hora inicio",
          "Hora inicio refrigerio",
          "Hora fin refrigerio",
          "Hora salida",
          "tadanza",
          "falta",
        ],
      });

      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
      return httpResponse.http200("Excel created", buffer);
    } catch (error) {
      console.log(error);
      return errorService.handleErrorSchema(error);
    }
  }
}

export const reportService = new ReportService();
