import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET(request: NextRequest) {
  if (!BACKEND_URL) {
    return new Response('BACKEND_URL is not defined', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const login = searchParams.get('login');

  if (!login) {
    return new Response('No login provided', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const response = await fetch(BACKEND_URL, {
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
  });

  const res = await response.json();

  if (res.result === true) {
    return new Response('', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } else {
    return new Response('', {
      status: 201,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
