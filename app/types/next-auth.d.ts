import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
    };
    expires: string;
    roles: Array<{
      role: string;
      restaurant_id: number | null;
    }>;
    status: string;
    update: (data: any) => void;
  }
}