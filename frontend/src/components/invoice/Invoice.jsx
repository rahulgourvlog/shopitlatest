import React, { useEffect } from 'react';
import "./invoice.css"
import Loader from '../layout/Loader';
import { useMyOrderDetailsQuery } from '../../redux/api/orderApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf"

const Invoice = () => {
    const params=useParams();
    const {data,isLoading,error}=useMyOrderDetailsQuery(params.id);
    const orders=data?.order || {};
   
    const{shippingInfo,paymentInfo,orderItems,itemsPrice,user,totalAmount}=orders
     //console.log('order=>>>',orders)
     const handleDownload=()=>{
const input=document.getElementById('order_invoice');
html2canvas(input).then((canvas)=>{
     const imageURL = canvas.toDataURL('image/png');
     const pdf = new jsPDF();
     const pdfHeight = 297;
     //const pdfWidth = 210;
     const pdfWidth=pdf.internal.pageSize.getWidth();
     pdf.addImage(imageURL,'PNG',0,0,pdfWidth,pdfHeight)
pdf.save(`invoice_${orders?._id}.pdf`)
})
     }
    useEffect(()=>{
        if(error){
          //console.log('errr',error)
          toast.error(error?.data?.message)
        }
      
       
        
            },[error])
            if (isLoading) return <Loader/>
  return (
    <>
   
    <div className="order-invoice my-5">
      <div className="row d-flex justify-content-center mb-5">
        <button className="btn btn-success col-md-5" onClick={handleDownload}>
          <i className="fa fa-print"></i> Download Invoice
        </button>
      </div>
      <div id="order_invoice" className="p-3 border border-secondary">
        <header className="clearfix">
          <div id="logo">
            <img src="/images/invoice-logo.png" alt="Company Logo" />
          </div>
          <h1>INVOICE  #{orders?._id}</h1>
          <div id="company" className="clearfix">
            <div>ShopIT</div>
            <div>
              455 Foggy Heights,
              <br />
              AZ 85004, US
            </div>
            <div>(602) 519-0450</div>
            <div>
              <a href="mailto:info@shopit.com">info@shopit.com</a>
            </div>
          </div>
          <div id="project">
            <div><span>Name</span>{user?.name}</div>
            <div><span>EMAIL</span> {user?.email}</div>
            <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
            <div>
              <span>ADDRESS</span> {shippingInfo?.address},{shippingInfo?.city},{shippingInfo?.zipCode}, {shippingInfo?.country}
            </div>
            <div><span>DATE</span> {new Date(orders?.createdAt).toLocaleString('en-US')}</div>
            <div><span>Status</span> {paymentInfo?.status}</div>
          </div>
        </header>
        <main>
          <table className="mt-5">
            <thead>
              <tr>
                <th className="service">ID</th>
                <th className="desc">NAME</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
                {orderItems.map((item,index)=>{
                    return(<>
                      <tr key={index}>
                <td className="service">{item?.id}</td>
                <td className="desc">{item?.name}</td>
                <td className="unit">$ {item?.price}</td>
                <td className="qty">{item?.quantity}</td>
                <td className="total">$ {item?.price* item?.quantity}</td>
              </tr>
                    
                    </>)
                })}
            
            

              <tr>
                <td colspan="4">
                  <b>SUBTOTAL</b>
                </td>
                <td className="total">$ {orders?.totalAmount}</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>TAX 15%</b>
                </td>
                <td className="total">$ {orders?.taxAmount}</td>
              </tr>

              <tr>
                <td colspan="4">
                  <b>SHIPPING</b>
                </td>
                <td className="total">$ {orders?.shippingAmount}</td>
              </tr>

              <tr>
                <td colspan="4" className="grand total">
                  <b>GRAND TOTAL</b>
                </td>
                <td className="grand total">$ {orders?.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              A finance charge of 1.5% will be made on unpaid balances after 30
              days.
            </div>
          </div>
        </main>
        <footer>
          Invoice was created on a computer and is valid without the signature.
        </footer>
      </div>
    </div>
    </>
  )
}

export default Invoice