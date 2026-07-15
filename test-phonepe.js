const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require('pg-sdk-node');

async function test() {
    try {
        const clientId = 'SU2607141834113505542635';
        const clientSecret = '6dcc9489-41e0-47d9-8f67-0e920e2b8fbe';
        const clientVersion = 1;
        const env = Env.PRODUCTION;
        
        const client = StandardCheckoutClient.getInstance(
            clientId, 
            clientSecret, 
            clientVersion, 
            env
        );

        const request = StandardCheckoutPayRequest.build_request({
            merchantOrderId: `TXN_${Date.now()}`,
            amount: 100, // 1 Rupee
            redirectUrl: 'https://lookrides.com/callback',
        });

        console.log('Sending request...');
        const response = await client.pay(request);
        console.log('Success:', JSON.stringify(response, null, 2));
    } catch (err) {
        console.error('Error:', err);
    }
}

test();
