import { withAuth } from "next-auth/middleware";
import { USER_ROLE } from "./app/utils/user";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    if (req.nextUrl.pathname === "/admin") {
      const isAuthorized = req.nextauth.token.roles.some(
        (role: any) =>
          role.role === USER_ROLE.SUPER_ADMIN ||
          role.role === USER_ROLE.ADMIN ||
          role.role === USER_ROLE.MANAGER
      );
      if (!isAuthorized) {
        return NextResponse.redirect("/");
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }: { token: any }) => {
        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
