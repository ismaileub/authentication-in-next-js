import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"



// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. 'Sign in with...')
//             name: 'Credentials',
//             // The credentials is used to generate a suitable form on the sign in page.
//             // You can specify whatever fields you are expecting to be submitted.
//             // e.g. domain, username, password, 2FA token, etc.
//             // You can pass any HTML attribute to the <input> tag through the object.
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password" },
//                 //email: { label: "Email", type: "email" }
//             },
//             async authorize(credentials, req) {
//                 console.log("Credentials:", credentials);
//                 // You need to provide your own logic here that takes the credentials
//                 // submitted and returns either a object representing a user or value
//                 // that is false/null if the credentials are invalid.
//                 // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//                 // You can also use the `req` object to obtain additional parameters
//                 // (i.e., the request IP address)
//                 // const res = await fetch("/your/endpoint", {
//                 //     method: 'POST',
//                 //     body: JSON.stringify(credentials),
//                 //     headers: { "Content-Type": "application/json" }
//                 // })
//                 //const user = await res.json()

//                 // const user = {
//                 //     id: 1,
//                 //     name: credentials.username,
//                 //     email: credentials.email,
//                 // }
//                 const { username, password } = credentials;
//                 const user = await dbConnect("test_user").findOne({ username });
//                 const isPasswordOK = password === user.password;

//                 // If no error and we have user data, return it
//                 if (isPasswordOK) {
//                     return user
//                 }
//                 // Return null if user data could not be retrieved
//                 return null
//             }
//         })
//     ],
//     callbacks: {
//         async session({ session, token, user }) {
//             if (token) {
//                 session.user.username = token.username
//                 session.user.role = token.role
//             }
//             return session
//         },
//         async jwt({ token, user, account, profile, isNewUser }) {
//             if (user) {
//                 token.username = user.username
//                 token.role = user.role
//             }
//             return token
//         }
//     }
// }



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }