import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import sharp from "sharp";
import pc from 'picocolors'
export const imageUploadStub = (file: File) => {
    return {
        downloadUrl: '',
    }
}

export const imageUpload = async (file: Express.Multer.File) => {
    // crear una referencia de la imagen en storage
    const newFileName = `${Date.now()}-${file.fieldname}` 
    const imageRef = ref(storage, `images/${newFileName}`);
    // optimizar el buffer con sharp
    const optimizedBuffer = await sharp(file.buffer)
        .resize({ width: 300, height: 300, fit: 'cover' })
        .toBuffer();
    // configurar la metadata de la imagen
    const metadata = {
        contentType: file.mimetype,
    }
    // subir la imagen con uploadBytes
    try {
        await uploadBytes(imageRef, optimizedBuffer, metadata)
        // retornar la url de descarga
        const downloadUrl = await getDownloadURL(imageRef)
        console.log(pc.blue('upload file function'));
        
        console.log(downloadUrl);
        
        return {
            downloadUrl
        }
    } catch (error) {
        throw error
    }
}