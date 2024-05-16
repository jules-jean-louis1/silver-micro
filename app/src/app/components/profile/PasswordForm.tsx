import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingLabelInput } from "@/components/ui/FloatingInput";
import { useState } from "react";   

export const PasswordForm = () => {
    const { data } = useSession();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        try {
            await signIn("credentials", {
                redirect: false,
                password,
                confirmPassword,
            });
        } catch (error) {
            console.error("Edit failed", error);
        }
    };

    return (
        <>
            <div>
                {data ? (
                    <form action="" method="post" onSubmit={handleSubmit} className="h-full">
                        <div className="flex flex-col justify-between h-full">
                            <FloatingLabelInput
                                id="password"
                                name="password"
                                type="password"
                                label="Mot de passe"
                                value=""
                                onChange={handleChange}
                            />
                            <FloatingLabelInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirmer mot de passe"
                                value=""
                                onChange={handleChange}
                            />
                            <Button type="submit" className="w-full flex space-x-3 items-center">
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
