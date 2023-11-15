/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';

// !=-=====================
// user
const userStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/user/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProfileImage = multer({
  storage: userStorage,
  limits: { fileSize: 512 * 1024 }, // 512kb

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only jpeg, jpg and png file will be accepted !!'));
  },
});
// !=-===========================================
// styles photos
const stylesStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/styles/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//
const uploadStylesImage = multer({
  storage: stylesStorage,
  limits: { fileSize: 512 * 1024 }, // 512kb

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only jpeg, jpg and png file will be accepted !!'));
  },
});

// ! =--------------------------------

// tack pack
const storageForTackPack = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/tackpack/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// upload middleware with fileValidator
const uploadTackPackPdf = multer({
  storage: storageForTackPack, // Use storageForTackPack instead of undefined storage
  limits: { fileSize: 1000000 }, // 1mb

  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only Pdf file is required !!'));
  },
});

// ! =--------------------------------

export const FileUploadHelper = {
  uploadProfileImage,
  uploadTackPackPdf,
  uploadStylesImage,
};
