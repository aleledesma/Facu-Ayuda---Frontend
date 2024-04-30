import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const verifyJwt = async (jwt: string, secret: string) => {
  try {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(secret))
    return payload
  } catch (error) {
    throw new Error("Invalid JWT")
  }
}

export const middleware = async (request: NextRequest) => {
  const jwt = request.cookies.get("jwt")
  if (request.nextUrl.pathname.includes("/subir")) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    try {
      await verifyJwt(jwt.value, process.env.JWT_SECRET as string)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else if (request.nextUrl.pathname.includes("/login")) {
    if (jwt) {
      try {
        await verifyJwt(jwt.value, process.env.JWT_SECRET as string)
        return NextResponse.redirect(new URL("/", request.url))
      } catch (error) {
        return NextResponse.next()
      }
    } else {
      return NextResponse.next()
    }
  }
}
