import { ReportType, data } from "src/data";
import { Injectable } from "@nestjs/common";
import { v1 as uuid } from 'uuid';
import { ReportResponseDto } from "src/dtos/report.dtos";


interface reportData {amount:number, source:string}

@Injectable()
export class ReportService {
  getAllReports(type:ReportType){

    return data.report.filter((report)=>report.type === type);
  }

  getReportById(type:ReportType,id:string){
    return data.report.filter((report)=>report.type === type)
    .find((report)=>report.id === id)
  }

  createReport(type:ReportType, {amount,source}:reportData){
    const newReport = {
      id:uuid(),
      source:source,
      amount:amount,
      created_at: new Date(),
      updated_at: new Date(),
      type:ReportType.INCOME
    }

    data.report.push(newReport)

    return newReport
  }

  updateReport(type:ReportType,id:string,reqReport:any){
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    const reportToUpdate = data.report.filter((report)=>report.type === reportType)
    .find((report)=>report.id === id)

    if(!(reportToUpdate)){
      return { source: undefined};
    }

    const reportIndex = data.report.findIndex((report)=>report.id === reportToUpdate.id);

    data.report[reportIndex] = {...reportToUpdate,...reqReport}
    return data.report[reportIndex]
  }

  deleteReport( id:string){
    const index = data.report.findIndex((obj)=>obj.id===id)
    if(index === -1){
      return {message:"No report with that Id or type found"};
    }
    data.report.splice(index,1);
    return "deleted"
  }
  
}
