"use server"

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";



const postSingleProducts = async (postedData) => {
    try {
        // const postedData = await req.json();
        const result = await dbConnect("nextjs").insertOne(postedData);
        revalidatePath("/products")
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default postSingleProducts;