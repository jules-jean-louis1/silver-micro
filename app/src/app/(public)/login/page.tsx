"use client";

import { LoginForm } from "@/app/components/auth/LoginForm";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [successRegister, setSuccessRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (successRegister) {
      handleTabChange("login");
    }
    setSuccessRegister(false);
  }, [successRegister]);

  return (
    <section className="w-screen h-[calc(100vh-56px)] flex justify-center items-center space-x-4">
      <article className="xl:w-[500px] xl:h-[680px] bg-sunshine-yellow rounded-xl p-4">
        <h2 className="text-3xl font-bold">
          Bienvenue dans votre aventure culinaire !
        </h2>
      </article>
      <article className="xl:w-[500px] xl:max-h-[680px] xl:h-[680px] border border-skyline-border rounded-xl p-4">
        <div className="w-full h-full flex flex-col space-y-6">
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
          <Tabs
            value={activeTab}
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="w-full bg-sunshine-yellow-light">
              <TabsTrigger value="login" className="w-1/2">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="w-1/2">
                Inscription
              </TabsTrigger>
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
