import { getSellers } from "@/lib/web3/aptos/marketplace";
import { NextResponse } from "next/server"

var cron = require('node-cron');

export async function GET(req: any, res: any) {

    try {

        cron.schedule('15 * * * *', async () => {
            const sellers = await getSellers()
            console.log("🚀 ~ cron.schedule ~ sellers:", sellers)
            console.log('')
            console.log('######################################')
            console.log('#                                    #')
            console.log('# Running scheduler every 1 minutes #')
            console.log('#                                    #')
            console.log('######################################')
            console.log('')

            // Perform your action here
        });

        return NextResponse.json({ data: 'Success', status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }

}