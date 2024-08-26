import { Injectable } from '@nestjs/common'

@Injectable()
export class GeneralService {
    constructor(){}

    isBuffer(data: any): boolean{
        return Buffer.isBuffer(data)
    }

    convertBuffer(data: [] = []): Buffer | any {
        return Buffer.from([...data])
    }
}