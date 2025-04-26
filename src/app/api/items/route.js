import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";


export async function GET() {

    // const data = {
    //     message: "Successfully get data",
    //     error: false,
    //     status: 200
    // }

    const data = await dbConnect("nextjs").find({}).toArray();

    return Response.json({ data })
}



export async function POST(req) {

    // const postedData = await req.json();
    // const result = await dbConnect("nextjs").insertOne(postedData);
    // revalidatePath("/products")
    // return Response.json(result)


}