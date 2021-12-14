import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'

const storage = new GridFsStorage({
    url: "mongodb+srv://admin:bXuZqb4GWMxheQ1G@cluster0.i6emt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    file: (req, file) =>
    {
        const match = ['image/png', 'image/jpg'];
        if (match.includes(file.mimetype)) {
            return {
                bucketName: 'photos',
                filename: `${Date.now()}-blog-${file.originalname}`
            }
        }
        else {
            return `${Date.now()}-blog-${file.originalname}`;
        }
    }
});

export default multer({ storage });