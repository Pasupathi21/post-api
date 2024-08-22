import { ExceptionFilter, Catch, HttpException, Logger, ArgumentsHost } from "@nestjs/common";
import { ResponseService } from "src/services/response/response.service";
import { Response } from 'express'


@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)
    constructor(private readonly responseService: ResponseService){}

    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const excpResponse: any = exception.getResponse()
        this.responseService.failed(response, excpResponse || null, excpResponse?.message, status)
    }

}