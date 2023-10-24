
require('dotenv').config();
const crypto = require('crypto');
// const multer = require('multer');
const sharp = require('sharp');
const { S3Client, ListBucketsCommand, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
const { ListingImage } = require("../models");
const { Listing } = require("../models");
const { User } = require("../models");


// prepare S3 client
const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});


//store file in memory before processing and sending
// exports.storeInMemory = async (req, res, next) => {
//   try {
//     upload.single('image');
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Image failed to upload to server" });
//   }
// }

//resize img, buffer, encrypt name, send to S3
exports.send = async (req, res) => {

  try {
  const file = req.file;

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1280, width: 1280, fit: "cover" })
    .toBuffer();

  const fileName = crypto.randomBytes(32).toString('hex');
  const params = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: file.mimetype
  }

    var result = await s3Client.send(new PutObjectCommand(params));
    return res.status(201).json({ fileName: fileName });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Image failed to send to S3" });
  }
}

// send with different size
exports.sendAvatar = async (req, res) => {

  try {
  const file = req.file;

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 100, width: 100, fit: "cover" })
    .toBuffer();

  const fileName = crypto.randomBytes(32).toString('hex');
  const params = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: file.mimetype
  }

    var result = await s3Client.send(new PutObjectCommand(params));
    return res.status(201).json({ fileName: fileName });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Image failed to send to S3" });
  }
}

//save record
exports.save = async (req, res) => {
  try {
    const imgRecord = await ListingImage.create({
      listingId: req.body.listingId,
      path: req.body.fileName,
      priority: req.body.priority
    });

    res.status(201).json({ message: "Successfully added image listing", imgage: imgRecord });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Image record failed to save" });
  }

};

exports.getAllbyListing = async (req, res) => {
  try {

    const imgs = await ListingImage.findAll({
      where: {
        listingId: req.params.id
      }
    });

    for (let i in imgs) {
      imgs[i].url = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: imgs[i].path
        }),
        { expiresIn: 86400 }
      )
      console.log(imgs[i].url);
      imgs[i] = { url: imgs[i].url, priority: imgs[i].priority };
    }
    res.json(imgs);
  } catch (err) {

    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getThumbnail = async (req, res) => {
  try {
    var listing = await Listing.findByPk(req.params.id);

    listing.img = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: listing.thumbnail
      }),
      { expiresIn: 3600 }
    )
    console.log(listing.img);
    img = { listingId: listing.id, url: listing.img };

    res.json(img);

  } catch (err) {

    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAvatar = async (req, res) => {
  try {
    var user = await User.findOne(
      {where: {
        avatar: req.params.fileName
      }});

    img = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: user.avatar
      }),
      { expiresIn: 3600 }
    )
    img = { url: img };

    res.json(img);

  } catch (err) {

    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPreview = async (req, res) => {
  try {

    img = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: req.params.fileName
      }),
      { expiresIn: 3600 }
    )
    console.log(img);
    img = { url: img };

    res.json(img);

  } catch (err) {

    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};