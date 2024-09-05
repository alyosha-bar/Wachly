import { NextResponse } from "next/server";


export async function POST(req : any) {

    try {
        const body = await req.json();
        const query = body.query;

        console.log(query)
        // find in turso


        // return query results
        return NextResponse.json({message: "hello"});

    } catch (err) {
        console.log(err);
    }
}