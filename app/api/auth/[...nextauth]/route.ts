import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";
// import { NextResponse } from "next/server";

// const handler = (request: Request) => {

  // console.log({request})
  //
  // const url = new URL(request.url)
  // const code = url.searchParams.get('code')
  // 
  // const res = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // })
  //
  // console.log({res})
  // console.log(res.body)
  //
  // const data = await res.json()
  //
  // console.log({data})
  // const userResponse = await fetch('https://api.github.com/user', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${data.access_token}`
  //   }
  // })
  //
  // const user = await userResponse.json()
  //
  // console.log({user})
  
  // return NextResponse.json(data)
//   return NextAuth(authOptions);
// }

const handler = NextAuth(authOptions)



export { handler as GET, handler as POST };
