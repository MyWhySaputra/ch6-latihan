const qr = require('node-qr-image');
const imagekit = require('../lib/imagekit');

function MediaProssesingImage(req, res) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    return res.status(200).json({
        status: true,
        message: 'success',
        data: {
            imageUrl
        }
    })
}

function MediaProssesingImages(req, res) {
    let respArray = []

    for (let index = 0; index < req.files.length; index++) {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.files[index].filename}`
        respArray.push(imageUrl)

    }

    return res.status(200).json({
        status: true,
        message: 'success',
        data: respArray
    })
}

function MediaProssesingVideo(req, res) {
    const imageUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`

    return res.status(200).json({
        status: true,
        message: 'success',
        data: {
            imageUrl
        }
    })
}

function MediaProssesingFile(req, res) {
    const imageUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`

    return res.status(200).json({
        status: true,
        message: 'success',
        data: {
            imageUrl
        }
    })
}

function GenerateQR(req, res) {

    const message = req.query.message;

    var qr_png = qr.image(message, { type: "png" });
    qr_png.pipe(
        require("fs").createWriteStream(
            `./public/qr/${message.toLowerCase()}.png`
        )
    );
    // const qr_png = qr.image(message, { type: "png" });
    return res.status(200).json({
        status: 200,
        message: "Success",
        data: qr_png,
    });
}

async function ImageKitUpload(req, res) {
    try {
        const stringFile = req.file.buffer.toString("base64");

        const uploadFile = await imagekit.upload({
            fileName: req.file.originalname,
            file: stringFile,
        });
        return res.json({
            status: 200,
            message: "success",
            data: {
                name: uploadFile.name,
                url: uploadFile.url,
                type: uploadFile.fileType,
            },
        });
    } catch (error) {
        throw error;
    }
}



module.exports = {
    MediaProssesingImage,
    MediaProssesingImages,
    MediaProssesingVideo,
    MediaProssesingFile,
    GenerateQR,
    ImageKitUpload
}