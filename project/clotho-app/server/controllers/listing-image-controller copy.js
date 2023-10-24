
const s3 = require('../utils/s3');
const ListingImage = require('../models/ListingImage');

exports.uploadPhoto = async (req, res) => {
  const { file, id, priority } = req.body;

  // Photo to the S3
  const params = {
    Bucket: 'clotho-bucket',
    Key: `${item_id}/${Date.now().toString()}`,
    Body: file,
  };

  try {
    const { Location } = await s3.upload(params).promise();
    
    // Save photo info in DB
    await ListingImage.create({
      id,
      path: Location,
      priority,
    });

    res.status(200).json({ message: 'Upload successful', url: Location });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

    // display photos

exports.getPhotos = async (req, res) => {
  const { itemId } = req.params;
  
  try {
    const photos = await ListingImage.findAll({
      where: { id: itemId },
      order: [['priority', 'ASC']]
    });

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
