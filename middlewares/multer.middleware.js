import multer from "multer";
import CustomError from "../CustomError.js";
import sharp from "sharp";
import { tryCatch } from "../utils/tryCatch.js";

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/students");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];

//     cb(
//       null,
//       `student-${Date.now()}-${Math.round(Math.random() * 1000)}.${ext}`
//     );
//   },
// });

const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new CustomError("not an image", 400, 5000));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: fileFilter });

export const uploadSingle = upload.single("photo");

export const uploadMulti = upload.array("photos", 5);

export const resizeImage = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  req.file.filename = `student-${Date.now()}-${Math.round(
    Math.random() * 1000
  )}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/students/${req.file.filename}`);

  next();
};

export const resizeImages = async (req, res, next) => {
  if (!req.files) {
    next();
    return;
  }

  req.body.files = [];

  for (let i = 0; i < req.files.length; i++) {
    const fileName = `student-${Date.now()}-${Math.round(
      Math.random() * 1000
    )}-${i}.jpeg`;
    req.body.files.push(`students/${fileName}`);
    await sharp(req.files[i].buffer)
      .resize(1000)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/students/${fileName}`);
  }

  next();
};
