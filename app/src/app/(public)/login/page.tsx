"use client";

import { LoginForm } from "@/app/components/auth/LoginForm";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function LoginPage() {
    const [successRegister, setSuccessRegister] = useState(false);

    const handleTabChange = (value: string) => {
        //console.log(value);
    };

  return (
    <section className="w-screen h-[calc(100vh-56px)] flex justify-center items-center">
      <article className="xl:w-[500px] xl:h-[680px] bg-green-200">
        <h2 className="text-3xl font-bold">
          Bienvenue dans votre aventure culinaire !
        </h2>
      </article>
      <article className="xl:w-[500px] xl:max-h-[680px] xl:h-[680px]">
        <div className="w-full h-full flex flex-col">
          <h2 className="text-3xl font-bold">Salut, content de te revoir!</h2>
          <div
            role="separator"
            style={{
              width: "100%",
              height: "1px",
              visibility: "visible",
              borderBottom: "1px solid rgba(55, 53, 47, 0.16)",
            }}
          ></div>
          <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="h-full">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="h-full">
              <RegisterForm setSuccessRegister={setSuccessRegister} />
            </TabsContent>
          </Tabs>
        </div>
      </article>
    </section>
  );
}
