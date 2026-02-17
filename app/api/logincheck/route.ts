import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const login = searchParams.get('login');

  if (login) {
    if (login === 'admin') {
      return new Response('Hello, admin!', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    return new Response(`Hello, ${login}!`, {
      status: 201,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  return new Response('No login provided', {
    status: 400,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
