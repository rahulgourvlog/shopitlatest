import React, { useEffect, useState } from 'react'
import { FILTER_CATEGORY } from '../../contants/constant';
import { useCreateNewProductMutation } from '../../redux/api/productsApi';
import AdminLayout from '../layout/AdminLayout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewProducts = () => {
    const [products,Setproducts]=useState({});
    const [createNewProduct,{isLoading,error,isSuccess}]=useCreateNewProductMutation()
    const handleSubmit=(e)=>{
e.preventDefault();
console.log('prod=>>>>',products);
createNewProduct(products)
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
    
    
      
       
        
            },[error,isSuccess])
  return (
   <>
   <AdminLayout>
   <div className="row wrapper">
      <div className="col-10 col-lg-10 mt-5 mt-lg-0">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">New Product</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
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
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn w-100 py-2">CREATE</button>
        </form>
      </div>
    </div>
    </AdminLayout>
   
   
   </>
  )
}

export default NewProducts