import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const params = await request.json();

    const response = await fetch(
      "http://192.168.1.195:8180/moiofis_control_vbghbbgfvv/hs/api", 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "method": "register",
          "params": {
            "name": params.name,
            "email": params.email,
            "login": params.login,
            "phone": params.phone, 
            "refer": ""
          }
        })
      }
    )

    const result = await response.json();

    if (result.error) {
        return new Response(JSON.stringify(result), {
            status: 400,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

}