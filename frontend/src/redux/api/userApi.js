import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setIsLoading, setUser } from "../feactures/userSlice";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    tagTypes:["User",'AdminUser','Review'],
    endpoints:(buider)=>({
      getMe:buider.query({
        query:()=>'/me',
        
        transformResponse:(response)=>response.user,
        async onQueryStarted(arg,{dispatch, queryFulfilled}){
            try{
                 const {data}=await queryFulfilled;
                 dispatch(setUser(data));
                 dispatch(setIsAuthenticated(true));
                 dispatch(setIsLoading(false))
            }
            catch(error){
                console.log(error)
                dispatch(setIsLoading(false))
            }
       },
       providesTags:['User']
      }),

      updateProfile:buider.mutation({
        query(body){
          return{
            url:'/me/update',
            method:'PUT',
            body
          }
        },
        invalidatesTags:['User']
      }),

      uploadAvatar:buider.mutation({
        query(body){
          return{
            url:'/me/upload_avatar',
            method:'PUT',
            body
          }
        },
        invalidatesTags:['User']
      }),
      updatePassword:buider.mutation({
        query(body){
          return {
            url:'/password/update',
            method:'PUT',
            body
          }
        }
      }),
      forgotPassword:buider.mutation({
        query(body){
          return {
            url:'/forgotPassword',
            method:'POST',
            body
          }
         
        }
      }),
      resetPassword:buider.mutation({
        query({token, body}){
          return{
            url:`/password/reset/${token}`,
            method:'PUT',
            body
          }
        }
      }),
      getUsers:buider.query({
        query:()=>`/admin/users`,
        providesTags:['AdminUser']
      }),
      getUsersDetails:buider.query({
        query:(id)=>`/admin/users/${id}`
      }),
      updateUserDetail:buider.mutation({
        query({id,body}){
         return{
          url:`/admin/users/${id}`,
          method:'PUT',
          body

        }
       
        },
        invalidatesTags:['AdminUser']
      }),
      deleteUser:buider.mutation({
        query(id){
         return{
          url:`/admin/users/${id}`,
          method:'DELETE',
          

        }
       
        },
        invalidatesTags:['AdminUser']
      }),
      getProductReview:buider.query({
        query:(productId)=>`/review?id=${productId}`,
        providesTags:['Review']
      }),
      deleteProductReview:buider.mutation({
        query({productId,Id}){
          return{
             url:`/admin/review?productId=${productId}&Id=${Id}`,
             method:'DELETE'

          }
        },
        invalidatesTags:['Review']
      })
    })
    
}

)


export const {useGetMeQuery,useUpdateProfileMutation,useUploadAvatarMutation,useUpdatePasswordMutation,useForgotPasswordMutation,useResetPasswordMutation,useGetUsersQuery,useGetUsersDetailsQuery,useUpdateUserDetailMutation,useDeleteUserMutation,useLazyGetProductReviewQuery,useDeleteProductReviewMutation}=userApi