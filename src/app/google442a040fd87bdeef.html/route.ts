export async function GET() {
  return new Response('google-site-verification: google442a040fd87bdeef.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
