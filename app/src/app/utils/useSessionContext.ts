import { useSession } from "next-auth/react";
import { canAccessAdminInterface, getIsSuperAdmin } from "./user";
import { AppSession } from "./AppSession";

export const useSessionContext = () => {
  const session = useSession();
  const sessionData = session?.data as AppSession;

  return {
    session: sessionData,
    getIsSuperAdmin: () => getIsSuperAdmin(sessionData),
    canAccessAdminInterface: () => canAccessAdminInterface(sessionData),
  };
};
