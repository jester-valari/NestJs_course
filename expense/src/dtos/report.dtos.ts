import { IsNumber, IsPositive, IsString, IsOptional } from "class-validator"
import { Exclude,Expose } from "class-transformer"
import { ReportType } from "src/data"

export class CreateReportDto{
    @IsNumber()
    @IsPositive()
    amount:number
    
    @IsString()
    source:string
}

export class UpdateReportDto{
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount:number
    
    @IsOptional()
    @IsString()
    source:string
}

export class ReportResponseDto{
    id:string;
    source:string;
    amount:number;
    created_at:Date;

    @Exclude()
    updated_at:Date;

    type:ReportType

    @Expose({name:'createAt'})
    transformCreatedat(){
        return this.created_at
    }

    constructor(partial: Partial<ReportResponseDto>){
        Object.assign(this, partial)
    }
}