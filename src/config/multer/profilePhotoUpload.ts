import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.resolve(__dirname, '..', '..', '..', 'uploads', 'profiles')}`)
  },

  filename: (req, file, cb) => {
    const filename = file.originalname
    cb(null, `${uuidv4()}${path.extname(filename)}`)
  }
})

const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'))
    } else {
      cb(null, true);
    }
  },
}).single('profilePhoto')

export default upload
