import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app'
import { FirebaseStorage, getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { imageMimeTypes, audioMimeTypes, videoMimeTypes, documentMimeTypes} from 'src/data/app.const'
import { FileHandlingService } from 'src/utils/filehandling/filehandling.service';
import { GeneralService } from 'src/utils/generals/generals.service';

type fileType = string | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOC'

@Injectable()
export class FirebaseService {

    logger = new Logger(FirebaseService.name)
    private firebaseApp: FirebaseApp = initializeApp({
        apiKey: process?.env?.API_KEY,
        authDomain: process?.env?.AUTH_DOMAIN,
        projectId: process?.env?.PROJECT_ID,
        storageBucket: process?.env?.STORAGE_BUCKET,
        messagingSenderId: process?.env?.MESSAGING_SENDER_ID,
        appId: process?.env?.APP_ID,
        measurementId: process?.env?.MEASUREMENT_ID
    });
    storageInstance: FirebaseStorage = getStorage(this.firebaseApp)
    constructor(
       private readonly genService: GeneralService,
       private readonly fileService: FileHandlingService

    ){}
    
    private getFolderHierarchyPath(file) {
        return imageMimeTypes.includes(file.mimetype) ? 'IMAGES' :
            audioMimeTypes.includes(file.mimetype) ? 'AUDIOS' :
                videoMimeTypes.includes(file.mimetype) ? 'VIDEOS' :
                    documentMimeTypes.includes(file.mimetype) ? 'DOCS' :
                        'OTHERS'
    }

    private async upload_to_firebase(file: Record<string, any>, fileType: fileType) {
        return new Promise(async (resolve: (value: any) => void, reject: (value: any) => void) => {
            try {
                let folderHierarchy = 'POSTS-APP/'
                // folderHierarchy += fileType === 'IMAGE' ? 'images' :
                //     fileType === 'AUDIO' ? 'audios' :
                //         fileType === 'VIDEO' ? 'videos' :
                //             fileType === 'DOC' ? 'docs' :
                //                 'others'
                const fullPath = `${folderHierarchy}${this.getFolderHierarchyPath(file)}/${Date.now()}-${file?.originalname}`
                this.logger.log(fullPath)
                const storageRef = ref(this.storageInstance, fullPath)
                const fileAsaBuffer = await this.fileService._readFile(file.path)
                console.log("fileAsaBuffer >>>>>>>>>>", fileAsaBuffer)
                // const bufferData = this.genService.isBuffer(file?.buffer) ? file?.buffer : this.genService.convertBuffer(file?.buffer?.data || [])
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    fileAsaBuffer,
                    {
                        contentType: file.mimetype
                    })
                uploadTask.on('state_changed', (snap) => {
                    this.logger.log(`progress completed: ${(snap.bytesTransferred / snap.totalBytes) * 100}%`)
                },
                    (error) => {
                        console.log("error", error)
                        this.fileService.unlinkFile(file?.path)
                        // new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR)
                    },
                    async () => {
                        try {
                            resolve({
                                ...uploadTask.snapshot.metadata,
                                downloadUrl: await getDownloadURL(uploadTask.snapshot.ref)
                            })
                            this.fileService.unlinkFile(file?.path)

                        } catch (err) {
                            this.logger.log("catch error", err)
                            this.fileService.unlinkFile(file?.path)
                            // new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR)
                        }
                    }
                )
            } catch (error) {
                reject(error)
            }
        })
    }

    private findFileType(fileObj: Record<string, any>): fileType {
        return  imageMimeTypes.includes(fileObj.mimetype) ? 'IMAGE':
        videoMimeTypes.includes(fileObj.mimetype) ? 'VIDEO' :
        audioMimeTypes.includes(fileObj.mimetype) ? 'AUDIO' :
        'DOC'

    }

    async upload_one_or_many(files: Record<string, any> | Record<string, any>[], fileType?: fileType) {
        const fileuploadResponse = []
        try {
            if(Array.isArray(files)){
                if (files?.length === 1) {
                    const res = await this.upload_to_firebase(files[0], this.findFileType(files[0]))
                    console.log("res >>>>>>>", res)
                    fileuploadResponse.push(res)
                } else {
                    for (let index = 0; index < files?.length; index++) {
                        const res = await this.upload_to_firebase(files[index], this.findFileType(files[index]))
                        fileuploadResponse.push(res)
                    }
                }
            }
            return Promise.resolve({
                status: true,
                message: 'upload success',
                fileuploadResponse
            })
        } catch (error) {
            console.log("error >>>", error)
            return Promise.reject({
                status: false,
                message: 'upload failed to firebase',
                error: error
            })
        }

    }

}
