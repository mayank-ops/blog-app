import express from 'express'
import { getImage, uploadImage } from '../controller/imageController.js';
import upload from '../utils/upload.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/postController.js';
import { newComment, getComments, deleteComment } from '../controller/commentController.js';
const router = express.Router();

router.route('/create')
    .post(createPost)

router.route('/posts')
    .get(getAllPosts)

router.route('/post/:id')
    .get(getPost)

router.route('/update/:id')
    .post(updatePost)

router.route('/delete/:id')
    .delete(deletePost)

router.route('/file/upload')
    .post(upload.single('file'), uploadImage)

router.route('/file/:filename')
    .get(getImage)

router.route('/comment/new')
    .post(newComment);

router.route('/comments/:id')
    .get(getComments);

router.route('/comment/delete/:id')
    .delete(deleteComment);

export default router;