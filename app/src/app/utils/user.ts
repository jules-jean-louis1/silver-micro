import { AppSession } from "./AppSession";

export enum USER_ROLE {
  "SUPER_ADMIN" = "superadmin",
  "ADMIN" = "admin",
  "MANAGER" = "manager",
  "PUBLIC" = "public",
}

export const USER_AVAILABLES_ROLES = [
  USER_ROLE.SUPER_ADMIN,
  USER_ROLE.ADMIN,
  USER_ROLE.MANAGER,
  USER_ROLE.PUBLIC,
] as const;

export const USER_ROLE_CHOICES = [USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER].map(
  (role) => ({
    id: role,
    name: role,
  })
);

export const getIsInRole = (roleA: any, roleB: any) => {
  return (
    USER_AVAILABLES_ROLES.indexOf(roleA) <= USER_AVAILABLES_ROLES.indexOf(roleB)
  );
};

export const getIsSuperAdmin = (session: AppSession): boolean => {
  if (!session || !session.roles) {
    return false;
  }
  return session.roles.some((role) => role.role === USER_ROLE.SUPER_ADMIN);
};

export const canAccessAdminInterface = (session: AppSession): boolean => {
  if (!session || !session.roles) {
    return false;
  }
  return session.roles.some(
    (role) =>
      role.role === USER_ROLE.ADMIN ||
      role.role === USER_ROLE.SUPER_ADMIN ||
      role.role === USER_ROLE.MANAGER
  );
};
