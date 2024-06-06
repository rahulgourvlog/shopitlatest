import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useDeleteProductImagesMutation, useGetProductsDetailsQuery, useUploadProductImagesMutation } from "../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UploadProducts = () => {
  const [images, SetImages] = useState([]);
  const [imagesPreview, SetImagesPreview] = useState([]);
  const [uploadedImages, SetUploadedImages] = useState([]);

  const navigate=useNavigate()
  const [uploadProductImages,{isLoading,error,isSuccess}]=useUploadProductImagesMutation();
  const [deleteProductImages,{isLoading:deleteLoading,isSuccess:SuccessDelete}]=useDeleteProductImagesMutation()
const inputRef=useRef(null)
  const handleChange = (e) => {
    //console.log("files=>>>", e.target.files);
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          SetImagesPreview((oldProduct) => [...oldProduct, reader.result]);
          SetImages((oldProduct) => [...oldProduct, reader.result]);
          //console.log("finish", reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const params = useParams();
  const { data } = useGetProductsDetailsQuery(params?.id);
  console.log("data=>>>", imagesPreview);
  
  
  useEffect(() => {
    if (data) {
      SetUploadedImages(data?.products?.images);
    }

    if(error){
        toast.error(error?.data?.message)
    }
    if(isSuccess){
       
        toast.success("uploaded Successfully !!");
        navigate("/admin/products")
        SetImagesPreview([])
    }
    if(SuccessDelete){
        toast.success("deleted Successfully !!");
    }
  }, [data,error,isSuccess,SuccessDelete]);

  const handleSelectedDelete = (image) => {
    const filterArray = imagesPreview.filter((img) => img !== image);
    SetImagesPreview(filterArray);
    SetImages(filterArray);
  };

  const handleRefChange=()=>{
if(inputRef.current){
     inputRef.current.value=""
    //console.log("input=>>>",inputRef.current)
}
  }

  const handleUpload=(e)=>{
e.preventDefault();
uploadProductImages({id:params?.id,body:{images}})
  }

  const handleDeleteuploaded=(image)=>{
    const imgId=image.public_id
//console.log("dele=>>>>",image.public_id);
deleteProductImages({id:params?.id,body:{imgId}})
  }
  return (
    <>
      <AdminLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8 mt-5 mt-lg-0">
            <form
              className="shadow rounded bg-body"
              enctype="multipart/form-data"
              onSubmit={handleUpload}
            >
              <h2 className="mb-4">Upload Product Images</h2>

              <div className="mb-3">
                <label htmlFor="customFile" className="form-label">
                  Choose Images
                </label>

                <div className="custom-file">
                  <input
                  ref={inputRef}
                    onChange={handleChange}
                    type="file"
                    name="product_images"
                    className="form-control"
                    id="customFile"
                    multiple
                    onClick={handleRefChange}
                  />
                </div>
{imagesPreview.length>0 && ( <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((image, index) => {
                      return (
                        <div className="col-md-3 mt-2" key={index}>
                          <div className="card">
                            <img
                              src={image}
                              alt="Card"
                              className="card-img-top p-2"
                              style={{ width: "100%", height: "80px" }}
                            />
                            <button
                              style={{
                                backgroundColor: "#dc3545",
                                borderColor: "#dc3545",
                              }}
                              type="button"
                              onClick={() => {
                                handleSelectedDelete(image);
                              }}
                              className="btn btn-block btn-danger cross-button mt-1 py-0"
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>)}
               
{uploadedImages.length>0 && ( <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((image, index) => {
                      return (
                        <div className="col-md-3 mt-2" key={index}>
                          <div className="card">
                            <img
                              src={image?.url}
                              alt="Card"
                              className="card-img-top p-2"
                              style={{ width: "100%", height: "80px" }}
                            />
                            <button
                              style={{
                                backgroundColor: "#dc3545",
                                borderColor: "#dc3545",
                              }}
                              className="btn btn-block btn-danger cross-button mt-1 py-0"
                              disabled={deleteLoading}
                              type="button"
                              onClick={()=>{handleDeleteuploaded(image)}}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>)}
               
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn w-100 py-2"
                disabled={isLoading}
              >
            {isLoading ? 'uploading...':'Upload'}    
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default UploadProducts;
