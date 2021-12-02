import { extname } from "path";
import { diskStorage } from "multer";

export const editFileName = (req, file, callBack) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const randomName = Date.now();
  callBack(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFilter = (req, file, callBack) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)/)) {
    req.fileValidationError = "only Image File Are allowed";
    return callBack(null, false);
  }
  return callBack(null, true);
};

export const storage = {
  storage: diskStorage({
    destination: "./profile/",
    filename: editFileName,
  }),
  fileFilter: imageFilter,
};
