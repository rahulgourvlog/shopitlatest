import React, { useEffect } from 'react'
import Metadata from './Metadata'
import { useGetProductsQuery } from '../../redux/api/productsApi'
import ProductItem from '../product/ProductItem';
import Loader from './Loader';
import toast from "react-hot-toast"
import CustomPagination from './CustomPagination';
import { useSearchParams } from 'react-router-dom';
import Filters from './Filters';
const Home = () => {
  const [searchParams]=useSearchParams();
  const page=searchParams.get('page')||1;
  const keyword=searchParams.get('keyword') || "";
  let min=searchParams.get('min');
  const max=searchParams.get('max');
const category=searchParams.get('category')
  const rating=searchParams.get('rating');
  const params={
    page,
    keyword
  }

  min!==null && (params.min=min);
  max!==null && (params.max=max);
  category!==null && (params.category=category);
  rating!==null && (params.rating=rating);
  //max!==null && params.max=max;
  const {data,isLoading,error,isError}=useGetProductsQuery(params);
console.log(data,"data")
useEffect(()=>{
if(isError){
 // console.log(error,"err")
 toast.error(error?.data?.message)
}
},[isError])
if (isLoading)return <Loader/>
  return (
   <>
<Metadata title={'Buy best Products Online'}/>
<div className="row">
  {keyword && 
    <div className='col-12 col-md-3 my-2'>
      <Filters />
    </div>
  }
  <div className={keyword ? `col-12 col-md-9` : `col-12`}>
    <h5 id="products_heading" className="text-secondary">
      {keyword ? `${data?.products?.length} product found with keyword` : "Latest Products"}
    </h5>

    <section id="products" className="mt-5">
      <div className="d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
        <div className="row w-100">
          {data?.products?.map((product) => {
            return (
           <>
          
                <ProductItem key={product.id} product={product} />
               
                </>
            )
          })}
        </div>
      </div>
    </section>
    <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filterProductLength} />
  </div>
</div>
    
   
   </>
  )
}

export default Home