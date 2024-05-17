import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingLabelInput } from "@/components/ui/FloatingInput";
import { useState } from "react";

export const ProfileForm = () => {
  const { data } = useSession();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = formData.firstname || (data && data.user.firstname);
    const lastname = formData.lastname || (data && data.user.lastname);
    const email = formData.email || (data && data.user.email);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Customer updated");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Edit failed", error);
    }
  };

  return (
    <>
      <div>
        {data ? (
          <form
            action=""
            method="put"
            onSubmit={handleSubmit}
            className="h-full"
          >
            <div className="flex flex-col justify-between h-full">
              <FloatingLabelInput
                id="firstname"
                name="firstname"
                type="text"
                label="Prénom"
                value={formData.firstname || data.user.firstname}
                onChange={handleChange}
              />
              <FloatingLabelInput
                id="lastname"
                name="lastname"
                type="text"
                label="Nom"
                value={formData.lastname || data.user.lastname}
                onChange={handleChange}
              />
              <FloatingLabelInput
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formData.email || data.user.email}
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="w-full flex space-x-3 items-center"
              >
                Modifier
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <p>Connectez-vous</p>
            <Button
              className="flex justify-center max-h-10 space-x-2"
              size="sm"
            >
              <Link href="/login">Connexion</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
