import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetch("https://api.sunrise-sunset.org/json?lat=6.961996264688412&lng=-107.80198732718051&formatted=0&tzid=Asia/Jakarta")
  const data = await response.json()
  return NextResponse.json(data)
}
