// src/app/api/auth/_log/route.ts
export async function POST(context: any) {
    // const body = await req.json();
    // console.log("Log data:", body); // Handle the log data as needed
    return new Response("Log received", { status: 200 });
}