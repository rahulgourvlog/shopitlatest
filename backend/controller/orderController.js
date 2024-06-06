import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../model/order.js";
import Product from "../model/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create newOrder =>  /api/v1/orders/new
export const newOder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// get Order Details
// Get Order details =>  /api/v1/orders/:id
export const orderDeatails = catchAsyncError(async (req, res, next) => {
  //populate method is used to get the details from other collection based on id
  // such that here we are getting user details name , email
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("cannot find order with Id", 400));
  }
  res.status(200).json({
    order,
  });
});

// Get Current User Orders =>  /api/v1/me/orders

export const myOrders = catchAsyncError(async (req, res, next) => {
  const userOrders = await Order.find({ user: req.user._id });
  res.status(200).json({
    userOrders,
  });
});

// get all Order by Admin api/v1/order

export const getAllOrderByAdmin = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();
  res.status(200).json({
    order,
  });
});

//update the Order By Admin api/v1/order/:id

export const updateOderByAdmin = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found by this Id", 400));
  }

  if (order?.orderStatus == "Delivered") {
    return next(new ErrorHandler("order is already delivered", 404));
  }

  let productNotFound=false
  //update the Stock of product

  //order?.orderItems?.forEach(async (items) => {
    for(const items of order?.orderItems){
    console.log('items=>>>>>',items)
    const products = await Product.findById(items.product);
    console.log('product122=>>>>',products)
    if (!products) {
      productNotFound=true;
      break;
    }

    products.stock = products.stock - items.quantity;
    await products.save({ validateBeforeSave: false });
    console.log("stock", products.stock);
  };
if(productNotFound){
  return next(new ErrorHandler("Product not found with this Id", 404));
}
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    sucess: true,
  });
});

// Delete the Order By Admin

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  //console.log(req.params.id)
  if (!order) {
    return next(ErrorHandler("no order found with this id", 400));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

const getDateBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  console.log("curr",currentDate)
  while (currentDate <= new Date(endDate)) {
    let formatedDate = currentDate.toISOString().split("T")[0];
    dates.push(formatedDate);
    currentDate.setDate(currentDate.getDate() + 1);
   
  }
  return dates;
};



const getSalesData = async (startDate, endDate) => {
  console.log(startDate,endDate,'count=>>>>');
  let salesData = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        noOfOrders: { $sum: 1 },
      },
    },
  ]);
  //console.log(salesData,'sales=>>>>')
  //create a map to store the data according to date

  let salesMap = new Map();
  let totalSales = 0;
  let totalOrders = 0;
  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const noOfOrders = entry?.noOfOrders;
   // console.log("data");
    salesMap.set(date, { sales, noOfOrders });
    totalSales += sales;
    totalOrders += noOfOrders;
  });
  //console.log(salesMap,'salesMap=>>>>>')

  //creating an data array in between date of startDate & endDate
  const dateBetween = getDateBetween(startDate, endDate);
  //console.log(dateBetween, "datebet=>>>>>");


  //create finalSales data array with zero sales give zero & if sales there then assign sales
  const finalSalesData=dateBetween.map((date)=>({
    date,
    sales:(salesMap.get(date)|| {sales:0}).sales,
    noOfOrders:(salesMap.get(date)|| {noOfOrders:0}).noOfOrders
  }))
  //console.log('finalSalesData=>>>>>>',finalSalesData)
  return{salesData:finalSalesData,totalSales,totalOrders}
};

export const SalesOrderData = catchAsyncError(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);
 const {salesData,totalSales,totalOrders}= await getSalesData(startDate, endDate);

  res.status(200).json({
    salesData,totalSales,totalOrders
  });
});
