const path = require("path");

const TEMP_FOLDER = path.resolve(__dirname, "..", "..", "temp");
const UPLOADS_FOLDER = path.resolve(__dirname,  "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination:TEMP_FOLDER
    })
}


