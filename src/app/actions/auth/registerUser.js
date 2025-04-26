"use server"

import dbConnect, { collectionName } from "@/lib/dbConnect";



const registerUser = async (payload) => {
    //need to check if unique name pass
    const result = await dbConnect(collectionName.TEST_USER).insertOne(payload);
    return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId.toString(), // ✅ convert ObjectId to string
    };
};

export default registerUser;