import { createReadStream, unlinkSync, readFile } from 'fs'
import { promisify } from 'util'

export class FileHandlingService {
    constructor(){}

    writeStream(){}

    readStream(path: string): any {
        return createReadStream(path)
    }
    unlinkFile(path: string){
        path && unlinkSync(path)
    }

    async _readFile(path: string) {
        try {
            const rfPromise = promisify(readFile)
            return await rfPromise(path)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}