import { Session } from "next-auth";
import { useSession } from "next-auth/react"
import { getIsSuperAdmin } from "./user";

export const useSessionContext = () => {
    const session = useSession();
    const sessionData = session.data as any;

    return {
        session: sessionData,
        getIsSuperAdmin: () => getIsSuperAdmin(sessionData as Session),
    }
}