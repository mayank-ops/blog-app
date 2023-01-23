import grid from 'gridfs-stream'
import mongoose from 'mongoose'

const url = process.env.BASE_URL;

const conn = mongoose.connection;
let gfs;
conn.once('open', () =>
{
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage = async (req, res) =>
{
    try {
        if (!req.file) {
            return res.status(404).json('file not found');
        }
        const imgURL = `${url}/file/${req.file.filename}`;
        res.status(200).json(imgURL);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}

export const getImage = async (req, res) =>
{
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (err) {
        res.status(500).json(err.message);
    }
}