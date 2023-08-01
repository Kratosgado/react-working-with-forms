import { products } from "../data/products";
import React from "react";
import { Link, useSearchParams } from 'react-router-dom';

export function ProductsPage() {
   const [searchParams] = useSearchParams();
   
   function getFilteredProducts() {
      const search = searchParams.get('search');
      if (search === null || search === "") {
         return products
      } else {
         return products.filter(
            (product) => product.name.toLowerCase()
               .indexOf(search.toLowerCase()) > -1
         )
      }
   }

   return (
      <div className="text-center p-5">
         <h2 className="text-x1 font-bold text-slate-600">
            Here are some great tools for React
         </h2>
         <ul className="list-none m-0 p-0">
            {getFilteredProducts().map((product) => (
               <li key={product.id}>
                  <Link to={`${product.id}`}  className="p-1 text-base text-slate-800 hover:underline">
                  {product.name}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}