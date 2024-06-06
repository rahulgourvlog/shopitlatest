import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const productsApi=createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({
        baseUrl
    }),
    tagTypes:['Product','AdminProduct'],
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:(params)=>({
                url:"/products",
                params:{
                    page:params?.page,
                    keyword:params?.keyword,
                    category:params?.category,
                    'rating[gte]':params?.rating,
                    "price[gte]":params.min,
                    "price[lte]":params.max
                }
            })
        }),
        getProductsDetails:builder.query({
            query:(id)=>`/products/${id}`,
            providesTags:['Product']
        }),
        submitReview:builder.mutation({
            query(body){
                return{
                    url:'/review',
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:['Product']
        }),
        canReview:builder.query({
            query:(productId)=>`/canreview/?productId=${productId}`,
            invalidatesTags:['Product']
           }),
           

           getAdminProducts:builder.query({
            query:()=>`/admin/products`,
            providesTags:['AdminProduct']
                }),
                createNewProduct:builder.mutation({
                    query(body){
                        return{
                            url:'/admin/products',
                            method:'POST',
                            body
                        }
                    },
                    invalidatesTags:['AdminProduct']
                }),
                updateProduct:builder.mutation({
                    query({id,body}){
                       return{
                        url:`/admin/products/${id}`,
                        method:'PUT',
                        body
                       }
                    },
                    invalidatesTags:['AdminProduct','Product']
                }),
                uploadProductImages:builder.mutation({
                    query({id,body}){
                        return{
                            url:`/admin/products/${id}/upload_images`,
                            method:'PUT',
                            body
                        }
                    },
                    invalidatesTags:['Product']
                }),
                deleteProductImages:builder.mutation({
                    query({id,body}){
                        return{
                            url:`/admin/products/${id}/delete_image`,
                            method:'PUT',
                            body
                        }
                    },
                    invalidatesTags:['Product']
                }),
                deleteProduct:builder.mutation({
                    query(id){
                        return{
                            url:`/admin/product/${id}`,
                            method:'DELETE'

                        }
                    },invalidatesTags:['AdminProduct']
                })
    }),
   
    
})

export const {useGetProductsQuery,useGetProductsDetailsQuery,useSubmitReviewMutation,useCanReviewQuery,useGetAdminProductsQuery,useCreateNewProductMutation,useUpdateProductMutation,useUploadProductImagesMutation,useDeleteProductImagesMutation,useDeleteProductMutation}=productsApi
