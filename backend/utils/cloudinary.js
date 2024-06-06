import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({path:'./backend/config/config.env'});
cloudinary.config({ 
    cloud_name: 'dr8nzobdz', 
    api_key:'986964383514299', 
    api_secret: 'zn49l_R759weLsNDIUmethHfM-k'
    //    cloud_name: process.env.CLOUDINARY_NAME,
    //      api_key:process.env.CLOUDINARY_API_KEY, 
    //  api_secret: process.env.CLOUDINARY_API_SECRET
  });


//   export const upload_file=(file,folder)=>{
//    return new Promise((resolve, reject)=>{
//     cloudinary.v2.uploader.upload(file,(result)=>{
//         console.log(result,"result")
//         resolve(
//            { public_id:result.public_id,
//             url:result.url}
//         ),
//         {
//             resource_type:'auto',folder
//         }
//     })
//    })
//   }

export const upload_file = async (file,folder) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type:'auto',
      folder
    };

    try {
      // Upload the image
      const result = await cloudinary.v2.uploader.upload(file, options);
     // console.log(result);
      return  { public_id:result.public_id,
                     url:result.url,};
    } catch (error) {
      console.error(error);
    }
};

  export const delete_file=async(file)=>{
 const res=await cloudinary.uploader.destroy(file);
 if(res?.result==='ok'){
return true
 }
  }