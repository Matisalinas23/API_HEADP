import multer from "multer";

const storage = multer.memoryStorage(); // guardamos el archivo en memoria
export const upload = multer({ storage });