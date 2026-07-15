async function test() {
    try {
        const clientId = 'SU2607141834113505542635';
        const clientSecret = '6dcc9489-41e0-47d9-8f67-0e920e2b8fbe';
        
        console.log('Getting token...');
        const authRes = await fetch("https://api.phonepe.com/apis/identity-manager/v1/oauth/token", {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_version: '1',
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            })
        });
        const authData = await authRes.json();
        console.log('Auth status:', authRes.status, authData);
        
        if (!authRes.ok) return;

        const token = authData.access_token;
        
        console.log('Initiating checkout...');
        const payRes = await fetch("https://api.phonepe.com/apis/pg/checkout/v2/pay", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `O-Bearer ${token}`
            },
            body: JSON.stringify({
                merchantOrderId: `TXN_${Date.now()}`,
                amount: 100, // 1 Rupee
                paymentFlow: {
                    type: "PG_CHECKOUT",
                    merchantUrls: {
                        redirectUrl: "https://lookrides.com/callback"
                    }
                }
            })
        });
        const payData = await payRes.json();
        console.log('Pay status:', payRes.status, payData);
    } catch (err) {
        console.error('Error:', err);
    }
}
test();
