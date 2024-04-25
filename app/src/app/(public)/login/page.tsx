"use client";

import { LoginForm } from "@/app/components/auth/LoginForm";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
