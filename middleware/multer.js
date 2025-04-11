import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skinbuddy-products', // You can customize the folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg'],
  },
});

const upload = multer({ storage: storage });

export default upload;
