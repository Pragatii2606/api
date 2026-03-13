 "use client";

import {useParams } from "next/navigation";

import {useEffect , useState} from "react";

import axios from "axios";

export default function SinglePage(){

    const Params= useParams();

    const [product , setProduct] =useState(null);

  const  databaseurl="https://dummyjson.com/products"

    useEffect(()=>{

        axios.get(`${databaseurl}/${Params.id}`)

            .then((res)=> setProduct(res.data))

            .catch((err) => console.error("Error fetching",err));

    }, [Params.id]);

     

    return(

        <div className ="fles flex-col md:flex-row gap-10">

            <img src={product?.thumbnail} className=" md:w-1/2 border"/>

            <div>

                <h1 className="text-3xl font-bold">{product?.title}</h1>

                <p className="text-gray-600 mt-4">{product?.description}</p>

                <div className="mt-6">

                    <span className="bg-gray-100 p-2 rounded test-sm">Category:{product?.category}</span>

                </div>

            </div>

        </div>

    )
}

