import { Session as NextAuthSession } from "next-auth";

export interface AppSession extends NextAuthSession {
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