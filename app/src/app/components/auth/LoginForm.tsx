import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { FloatingLabelInput } from "@/components/ui/FloatingInput";

export const LoginForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit} className="h-full">
        <div className="flex flex-col justify-between h-full">
          <FloatingLabelInput
            id="email"
            name="email"
            type="email"
            label="Email"
          />
          <FloatingLabelInput
            id="password"
            name="password"
            type="password"
            label="Password"
          />
          <Button type="submit" className="w-full flex space-x-3 items-center">
            Connexion
            <LogIn />
          </Button>
        </div>
      </form>
    </>
  );
};
