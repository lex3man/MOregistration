import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(request: NextRequest) {
  if (!BACKEND_URL) {
    return new Response('BACKEND_URL is not defined', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const params = await request.json();

  const response = await fetch(BACKEND_URL, {
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