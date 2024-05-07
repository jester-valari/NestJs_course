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
import { data, ReportType } from './data';
import { v1 as uuid } from 'uuid';


@Controller('report/:type')
export class AppController {

}