import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userDetails = {
          id: 12,
          email: "test@email.com",
          password: "password",
        };

        // Check if credentials match the hardcoded user
        if (
          credentials.email === userDetails.email &&
          credentials.password === userDetails.password
        ) {
          // Return user object if authorized
          return userDetails;
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", 
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token if available
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure a secret is set in the environment variables
});

export { handler as GET, handler as POST };
