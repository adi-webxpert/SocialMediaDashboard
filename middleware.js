
// https://github.com/nextauthjs/next-auth/discussions/4996

// https://next-auth.js.org/configuration/nextjs#advanced-usage
// import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware"
// const middleware = withAuth({
//   pages: {
//     signIn: "/auth/signin",
//   },
// });

// export default middleware;

export const config = { matcher: [`/` ,`/bids/:path*`] };





// export default middleware;


