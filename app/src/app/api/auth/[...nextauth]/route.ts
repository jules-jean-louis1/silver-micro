import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../../config";
import { Customer } from "@/app/models/customer";

sequelize.sync();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string, password: string };

        if (username === "" || password === "") {
            throw new Error("Champs manquants");
        }

        const customer = await Customer.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: username }],
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
    async jwt({ token, customer }: { token: any, customer: any }) {
      if (customer) {
        token.customer = customer;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = {
        id: token.customer.id,
        username: token.customer.username,
        email: token.customer.email,
      };
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    storage: "jwt",
  },
};

export const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };