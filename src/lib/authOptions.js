import dbConnect, { collectionName } from "./dbConnect";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                //email: { label: "Email", type: "email" }
            },
            async authorize(credentials, req) {
                console.log("Credentials:", credentials);
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                //const user = await res.json()

                // const user = {
                //     id: 1,
                //     name: credentials.username,
                //     email: credentials.email,
                // }
                const { username, password } = credentials;
                const user = await dbConnect("test_user").findOne({ username });
                const isPasswordOK = password === user.password;

                // If no error and we have user data, return it
                if (isPasswordOK) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account) {
                try {
                    const { providerAccountId, provider } = account;
                    const { email: user_email, image, name } = user;
                    //console.log("from signin", user, account, profile, email, credentials);
                    const payload = {
                        role: "user",
                        providerAccountId,
                        provider,
                        user_email,
                        name,
                        image
                    }
                    console.log("from signin", payload);
                    const userCollection = await dbConnect(collectionName.TEST_USER);
                    const isUserExist = await userCollection.findOne({ providerAccountId })

                    if (!isUserExist) {
                        await userCollection.insertOne(payload);
                    }
                } catch (error) {

                    console.log(error);
                    return false;

                }
            }


            return true
        },
        async session({ session, token, user }) {
            if (token) {
                session.user.username = token.username
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.username = user.username
                token.role = user.role
            }
            return token
        }
    }
}