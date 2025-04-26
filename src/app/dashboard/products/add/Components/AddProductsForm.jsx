"use client"
import postSingleProducts from '@/app/actions/products/postSingleProducts';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddProductsForm = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { NEX_PUBLIC_SERVER_ADDRESS } = process.env;

        try {
            // const res = await fetch(`${NEX_PUBLIC_SERVER_ADDRESS}/api/items`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            // const result = await res.json();
            const result = await postSingleProducts(formData);
            console.log('Product added:', result);

            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
            });
            //alert("Product added Successfully")
            router.push("/products")
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductsForm;
