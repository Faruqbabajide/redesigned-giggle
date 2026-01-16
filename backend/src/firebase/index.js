const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2;

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } catch (err) {
    throw new Error('Invalid JSON in FIREBASE_SERVICE_ACCOUNT_JSON');
  }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  throw new Error('Firebase service account not provided. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { admin, bucket, cloudinary };
