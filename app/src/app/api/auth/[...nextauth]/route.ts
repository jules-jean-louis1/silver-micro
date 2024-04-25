import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../config";
import { Customer } from "@/app/models/customer";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import "@/app/models/relationships";


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
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
      
          await connectToDatabase();
      
          if (email === "" || password === "") {
            throw new Error("Champs manquants");
          }

          const customer = await Customer.findOne({ where: { email } });

          if (!customer) {
            throw new Error("Utilisateur introuvable");
          }
      
          const passwordMatch = bcrypt.compareSync(password, customer.password);
      
          if (!passwordMatch) {
            throw new Error("Mot de passe incorrect");
          }

          const roles = await CustomerRole.findAll({
            where: { customer_id: customer.id },
            attributes: ["role", "restaurant_id"],
          });

          console.log(roles);
          return { customer, roles };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params: any) {
      const { token, user } = params;
      if (user) {
        const { customer, roles } = user;
        token.customer = {
          id: customer.id,
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
        };
        token.roles = roles.map((role: any) => ({
          role: role.role,
          restaurant_id: role.restaurant_id,
        }));
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.customer) {
        session.user = {
          id: token.customer.id,
          firstname: token.customer.firstname,
          lastname: token.customer.lastname,
          email: token.customer.email,
        };
        session.roles = token.roles;
      }
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
