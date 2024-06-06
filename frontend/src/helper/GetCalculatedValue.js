

export const calculateOrderCost=(cartItems)=>{
const ItemsPrice=cartItems.reduce((acc,items)=>acc+items?.price*items?.quantity,0)

const shippingPrice=ItemsPrice>200? 0:25
const taxPrice=Number((0.15*(ItemsPrice)).toFixed(2));

const totalPrice=Number(ItemsPrice+shippingPrice+taxPrice).toFixed(2)

return {ItemsPrice,shippingPrice,taxPrice,totalPrice}
}

