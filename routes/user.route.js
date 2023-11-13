const router = require("express").Router();
const storage = require("../lib/multer");
const {
    MediaProssesingImage,
    MediaProssesingImages,
    MediaProssesingVideo,
    MediaProssesingFile,
    GenerateQR,
    ImageKitUpload } = require("../controller/user.controller");

router.post("/image", storage.image.single("images"), MediaProssesingImage)
router.post("/images", storage.image.array("images"), MediaProssesingImages)
router.post("/videos", storage.video.single("videos"), MediaProssesingVideo)
router.post("/files", storage.file.single("files"), MediaProssesingFile)

router.post("/qr", GenerateQR)

const multer = require("multer")();
router.post("/imagekit", multer.single("images"), ImageKitUpload)

module.exports = router