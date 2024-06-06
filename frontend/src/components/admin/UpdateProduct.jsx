import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { FILTER_CATEGORY } from '../../contants/constant';
import { useGetProductsDetailsQuery, useUpdateProductMutation } from '../../redux/api/productsApi';

const UpdateProduct = () => {
    const [products,Setproducts]=useState({
        name:'',
        description:'',
        price:'',
        stock:'',
        category:'',
        seller:''
    });
const {name,description,price,stock,category,seller}=products
    const [updateProduct,{isLoading,error,isSuccess}]=useUpdateProductMutation();
    const params=useParams();
    //console.log('param=>>>',params)
    const {data}=useGetProductsDetailsQuery(params?.id)
    console.log('data=>>>>',data);
    const handleSubmit=(e)=>{
e.preventDefault();

updateProduct({id:params?.id,body:products})
    }
    const handleChange=(e)=>{
const inputName=e.target.name;
Setproducts({...products,[inputName]:e.target.value})
    }


    const navigate=useNavigate()
    useEffect(()=>{
        if(error){
          //console.log('errr',error)
          toast.error(error?.data?.message)
        }
       if(isSuccess){
        toast.success('product Created Sucessfully!!')
navigate('/admin/products')
       }
       if(data){
        Setproducts({
            name:data?.products?.name,
            description:data?.products?.description,
            price:data?.products?.price,
            stock:data?.products?.stock,
            category:data?.products?.category,
            seller:data?.products?.seller


        }
           
        )
       }


    
    
      
       
        
            },[error,isSuccess,data])
  return (
   <>
   <AdminLayout>
   <div className="row wrapper">
      <div className="col-10 col-lg-10 mt-5 mt-lg-0">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update Product</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description_field" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description_field"
              rows="8"
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="price_field" className="form-label"> Price </label>
              <input
                type="text"
                id="price_field"
                className="form-control"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col">
              <label htmlFor="stock_field" className="form-label"> Stock </label>
              <input
                type="number"
                id="stock_field"
                className="form-control"
                name="stock"
                value={stock}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="category_field" className="form-label"> Category </label>
              <select className="form-select" id="category_field" name="category" onChange={handleChange}>
                {FILTER_CATEGORY.map((category,index)=>(<option key={index} value={category}>{category}</option>))}
                
               
              </select>
            </div>
            <div className="mb-3 col">
              <label htmlFor="seller_field" className="form-label"> Seller Name </label>
              <input
                type="text"
                id="seller_field"
                className="form-control"
                name="seller"
                value={seller}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn w-100 py-2" disabled={isLoading}>{isLoading? "Updating..":'Update'}</button>
        </form>
      </div>
    </div>
    </AdminLayout>
   
   
   </>
  )
}

export default UpdateProduct