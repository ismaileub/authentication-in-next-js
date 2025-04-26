"use server"

import dbConnect from "@/lib/dbConnect";



const getProducts = async () => {
    try {
        const data = await dbConnect("nextjs").find({}).toArray();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getProducts;