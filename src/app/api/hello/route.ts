export async function GET(request: Request) {
  console.log("🐛 XXX ~ GET ~ request:", request)
  const { searchParams } = new URL(request.url)

  return Response.json({ foo: "bar" })
}
