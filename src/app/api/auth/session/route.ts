
// src/app/api/auth/session/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../[...nextauth]/[...nextauth]';
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(context: any) { 
    // const session = await getServerSession(context.req, context.res, authOptions) 
    return new Response('{}', { status: 200 });
    // if ('session' && context.res) {
    //     return context.res.json('session');
    // } else {
    //     return context.res.status(401).json({ message: 'Unauthorized' });
    // }
}