import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const login = searchParams.get('login');

  if (login) {
    if (login === 'admin') {
      return new Response('', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const body = JSON.stringify({ 
      "method": "checklogin",
      "params": {
        "login": login
      }
    });
    
    // return new Response(body, {
    //   status: 202,
    //   headers: {
    //     'Content-Type': 'text/plain',
    //   },
    // })

    const response = await fetch(
      "http://192.168.1.195:8180/moiofis_control_vbghbbgfvv/hs/api", 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "method": "checklogin",
          "params": {
            "login": login
          }
        })
      }
    )

    const res = await response.json();

    if (res.result === true) {
      return new Response(``, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } else {
      return new Response(``, {
        status: 201,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }
  return new Response('No login provided', {
    status: 400,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
