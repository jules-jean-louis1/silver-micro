import { FloatingLabelInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useState } from "react";

type RegisterFormProps = {
    setSuccessRegister: (value: boolean) => void;
  };

export const RegisterForm = ({ setSuccessRegister}: RegisterFormProps) => {


  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: e.currentTarget.email.value,
                firstname: e.currentTarget.firstname.value,
                lastname: e.currentTarget.lastname.value,
                password: e.currentTarget.password.value,
                passwordConfirm: e.currentTarget.passwordConfirm.value,
            }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuccessRegister(true);
            } else {
                console.error(data.error);
            }
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  return (
    <>
      <form action="" method="post" className="h-full" onSubmit={handelSubmit}>
        <div className="flex flex-col justify-between h-full">
          <FloatingLabelInput
            id="email"
            name="email"
            type="email"
            label="E-mail"
          />
          <FloatingLabelInput
            id="firstname"
            name="firstname"
            type="text"
            label="Prénom"
          />
          <FloatingLabelInput
            id="lastname"
            name="lastname"
            type="text"
            label="Nom"
          />
          <FloatingLabelInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
          />
          <FloatingLabelInput
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="Confirmer le mot de passe"
          />
          <Button type="submit" className="w-full flex space-x-3 items-center">
            S'inscrire
            <LogIn />
          </Button>
        </div>
      </form>
    </>
  );
};
