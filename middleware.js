// import { NextResponse } from "next/server";

// export default function middleware(request) {
//     console.log(request);
    
//   return NextResponse.redirect(new URL('/about', request.url))
// }

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"


// use it to redirect user to /login if not logged in!!
export { auth as middleware } from "@/app/_lib/auth"

export const config = {
    matcher: ['/account']
}