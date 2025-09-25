import  { v2 as cloudinary } from "cloudinary"

const NAME: string = process.env.CLOUDINARY_CLOUD_NAME!
const KEY: string = process.env.CLOUDINARY_API_KEY!
const SECRET: string = process.env.CLOUDINARY_API_SECRET!

// Configuration
cloudinary.config({ 
  cloud_name: NAME,
  api_key: KEY, 
  api_secret: SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary