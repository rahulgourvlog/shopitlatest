import React from 'react'

const GetPriceByFilter = (searchParams,key ,value) => {
 const  hasValueinParams=searchParams.has(key);
 if(hasValueinParams && value){
    searchParams.set(key,value)
 }
 else if(value){
    searchParams.append(key,value)
 }
 else if(hasValueinParams){
searchParams.delete(key)
 }
 return searchParams
}

export default GetPriceByFilter