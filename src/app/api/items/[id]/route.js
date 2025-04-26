import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {

    const p = await params;
    console.log(p);
    const singleData = await dbConnect("nextjs").findOne({ _id: new ObjectId(p.id) })

    return Response.json(singleData)
}


export async function DELETE(req, { params }) {

    const p = await params;

    console.log(params);


    const result = await dbConnect("nextjs").deleteOne({ _id: new ObjectId(p.id) })

    return Response.json(result)
}


export async function PATCH(req, { params }) {

    const p = await params;
    console.log(p);
    const updatedData = await req.json();
    const filter = { _id: new ObjectId(p.id) };
    const result = await dbConnect("nextjs").updateOne(filter, { $set: { ...updatedData } }, { upsert: true });

    return Response.json(result);
}
