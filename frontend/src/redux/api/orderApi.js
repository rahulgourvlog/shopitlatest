import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
 export const orderApi=createApi({
    reducerPath:'orderApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    tagTypes:['Order','AdminOrder'],
    endpoints:(builder)=>({

        createOrder:builder.mutation({
            query(body){
                return{
                    url:'/order/new',
                    method:'POST',
                    body
                }
            }
        }),
        checkoutsession:builder.mutation({
            query(body){
                return{
                    url:'/payment/checkout_session',
                    method:'POST',
                    body
                }
            }
        }),
        myOrders:builder.query({
            query:()=>`/me/orders`,
           
        }),
        myOrderDetails:builder.query({
            query:(id)=>`/order/${id}`,
            providesTags:['Order']
        }),
        adminDashboard:builder.query({
            query:({startDate,endDate})=>`/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`
        }),
        adminOrders:builder.query({
            query:()=>`/admin/order`,
            providesTags:['AdminOrder']
        }),
        updateOrders:builder.mutation({
            query({id,body}){
                return {
                    url:`/admin/order/${id}`,
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:['Order']
        }),
        deleteOder:builder.mutation({
            query(id){
                return {
                    url:`/admin/order/${id}`,
                    method:'DELETE'

                }
            },
invalidatesTags:['AdminOrder']
        })
      
    })
    

})

export const {useCreateOrderMutation,useCheckoutsessionMutation,useMyOrdersQuery,useMyOrderDetailsQuery,useLazyAdminDashboardQuery,useAdminOrdersQuery,useUpdateOrdersMutation,useDeleteOderMutation}=orderApi