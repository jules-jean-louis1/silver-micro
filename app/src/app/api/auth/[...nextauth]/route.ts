import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../config";
import { Customer } from "@/app/models/customer";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectToDatabase();

        if (email === "" || password === "") {
          throw new Error("Champs manquants");
        }
        const customer = await Customer.findOne({
          where: {
            email: email,
          },
        });
        if (!customer) {
          throw new Error("Utilisateur introuvable");
        }

        const passwordMatch = bcrypt.compareSync(password, customer.password);

        if (!passwordMatch) {
          throw new Error("Mot de passe incorrect");
        }

        if (customer) {
          return customer;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, customer }: { token: any; customer: any }) {
      if (customer) {
        token.customer = customer;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.customer.id,
        username: token.customer.username,
        email: token.customer.email,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    storage: "jwt",
  },
};

export const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
