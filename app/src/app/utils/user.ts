import { Session } from "next-auth";

export enum USER_ROLE {
  "SUPER_ADMIN" = "superadmin",
  "ADMIN" = "admin",
  "EDITOR" = "editor",
  "PUBLIC" = "public",
}

export const USER_ROLES = [
  USER_ROLE.SUPER_ADMIN,
  USER_ROLE.ADMIN,
  USER_ROLE.EDITOR,
  USER_ROLE.PUBLIC,
] as const;

export type UserRole = typeof USER_ROLES[number];

export const getIsSuperAdmin = (session: Session) => {
    if (!session) {
        return false;
    }
    return session.roles.some((role) => role.role === USER_ROLE.SUPER_ADMIN);
};