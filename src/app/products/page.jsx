
import dbConnect from '@/lib/dbConnect';
import { redirect } from 'next/navigation';
import React from 'react';
import getProducts from '../actions/products/getProducts';

export const dynamic = "force-dynamic"


const ProductsPage = async () => {
    const { NEX_PUBLIC_SERVER_ADDRESS } = process.env;
    // const res = await fetch(`${NEX_PUBLIC_SERVER_ADDRESS}/api/items`, {
    //     cache: "force-cache"
    // });


    // const res = await fetch(`${NEX_PUBLIC_SERVER_ADDRESS}/api/items`)
    // const { data } = await res.json();

    const data = await getProducts();

    // if (data.length > 3) {
    //     redirect("/");
    // }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>

            {data.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((product) => (
                        <div
                            key={product._id}
                            className="p-4 border rounded shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 font-medium">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
