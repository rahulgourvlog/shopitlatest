
//create Stripe checkout Session => /api/v1/payment/checkout_session
import Stripe from 'stripe';
import Order from "../model/order.js"
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
import catchAsyncError from "../middleware/catchAsyncError.js";



export const stripeCheckoutSession=catchAsyncError(async(req,res,next)=>{
    const body=req.body;
    const shipping_info=body?.shippingInfo;
   // console.log(req.body,'body')
    const line_items=body?.orderItems?.map((item)=>{
        return{
            price_data:{
                currency:'usd',
                product_data:{
                    name:item?.name,
                    images:[item?.image],
                    metadata:{productId:item?.product}
                },
                unit_amount:item?.price*100,

            },
            quantity:item?.quantity,
            tax_rates:['txr_1P7TP3SFX2fv5XHnu98JgBZs']

        }
    })
    const shipping_rate=body.itemsPrice>=200? "shr_1P7T7GSFX2fv5XHnijgT3FCK":"shr_1P7T8SSFX2fv5XHnNZOGjtdk"
    const session= await stripe.checkout.sessions.create({
        success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`,
        cancel_url:`${process.env.FRONTEND_URL}`,
        mode: 'payment',
        payment_method_types: [
            "card"
          ],
          customer_email:req?.user?.email,
          client_reference_id:req?.user?._id.toString(),
          shipping_options:[
            {
                shipping_rate
            }
          ],
          line_items,
          metadata:{...shipping_info,itemsPrice:body?.itemsPrice}


    })
// -------------------------
//console.log('session',session.url)
    res.status(200).json({
        url:session.url
    })
})

const getOrderItems=async(lineItems)=>{
    return new Promise((resolve,reject)=>{
let cartItems=[];
lineItems.data.forEach(async(item)=>{
const product=await stripe.products.retrieve(item.price.product);
//console.log('prod=>',product)
const productId=product.metadata.productId
cartItems.push(
    {
        product:productId,
        name:product.name,
        price:item.price.unit_amount_decimal/100,
        quantity:item.quantity,
        image:product.images[0]

    }
)
if(cartItems.length==lineItems?.data?.length){
    resolve(cartItems)
}

})
    })
    }


export const stripeWebhook=catchAsyncError(async(req,res,next)=>{
    try{
        const sig = req.headers['stripe-signature'];
const event=stripe.webhooks.constructEvent(req.rawBody,sig,process.env.STRIPE_WEBHOOK_SECRET)

if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    //console.log('session=>check',session)

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
//console.log(lineItems,'line=>')
//console.log('line=>producet',lineItems.data[0].price)

const orderItems=await getOrderItems(lineItems)
//console.log(orderItems,'order=>')
const user=session.client_reference_id;
const totalAmount=session.amount_total/100;
const taxAmount=session.total_details.amount_tax/100;
const shippingAmount=session.total_details.amount_shipping/100;
const itemsPrice=session.metadata.itemsPrice;
const shippingInfo={
    address:session.metadata.address,
    phoneNo:session.metadata.phoneNo,
    city:session.metadata.city,
    country:session.metadata.country,
    zipCode:session.metadata.zipCode
}
const paymentInfo={
    id:session.payment_intent,
    status:session.payment_status
}
const orderData={
    shippingInfo,
    orderItems,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
paymentInfo,
paymentMethod:'Card',
user
}
console.log('orderCr=>>>>>',orderData)
const ordercreate=Order.create(orderData)
    res.status(200).json({success:true})
  }
    }catch(err){
        console.log(err,"error")
    }

})