import {
    Controller, 
    Get, 
    Post, 
    Put,
    Patch,
    Delete, 
    Param, 
    Body, 
    HttpCode,
    ParseUUIDPipe,
    ParseEnumPipe
  } from '@nestjs/common'
  import { data, ReportType } from 'src/data';
  import { v1 as uuid } from 'uuid';
  import { CreateReportDto,UpdateReportDto,ReportResponseDto } from 'src/dtos/report.dtos';
import { ReportService } from './report.service';
  
  @Controller('report/:type')
  export class ReportController {
  
    constructor(
      private readonly reportService: ReportService
    ){}
  
    @Get()
    getAllIncomeReports(@Param('type', new ParseEnumPipe(ReportType)) type: String):ReportResponseDto[]{
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      const getReports = this.reportService.getAllReports(reportType);
      console.log(getReports)
      return getReports.map((report)=> new ReportResponseDto(report))
    }
  
    @Get(':id')
    getReportById(
      @Param('type', 
      new ParseEnumPipe(ReportType)) type:string, 
      @Param('id',ParseUUIDPipe) id: string,
    ):ReportResponseDto{
      console.log(id,typeof id)
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      const report =  this.reportService.getReportById(reportType,id);
      return new ReportResponseDto(report);
    }
    
    @Post()
    createReport(
      @Body() {amount,source}:CreateReportDto,
      @Param('type') type:string
    ):ReportResponseDto{
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      const newReport = this.reportService.createReport(reportType,{amount,source})
      return  new ReportResponseDto(newReport)
    }
  
    @Patch(':id')
    updateReport(
      @Param('type') type:string,
      @Param('id',ParseUUIDPipe) id:string, 
      @Body() reqReport: UpdateReportDto):ReportResponseDto
      {
        console.log(reqReport)
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        const updatedReport = this.reportService.updateReport(reportType,id,reqReport)
        return new ReportResponseDto(updatedReport)
      }
  
    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id',ParseUUIDPipe) id:string){
      return this.reportService.deleteReport(id);
    }
  }