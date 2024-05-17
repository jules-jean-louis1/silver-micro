"use client";

import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileForm } from "@/app/components/profile/ProfileForm";
import { PasswordForm } from "@/app/components/profile/PasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

function ProfilePage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col items-center space-y-4">
      <Tabs>
        <TabsList>
          <TabsTrigger value="Modifier">Modifier </TabsTrigger>
          <TabsTrigger value="Password">Modifier mot de passe</TabsTrigger>
        </TabsList>
        <TabsContent value="Modifier">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="Password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
