import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingLabelInput } from "@/components/ui/FloatingInput";
import { useState } from "react";   
import { id } from "date-fns/locale";

type PasswordFormProps = {
    setSuccessPassword: (value: boolean) => void;
};

export const PasswordForm = ({ setSuccessPassword}: PasswordFormProps) => {
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
        const user_id = data && data.user.id;

        e.preventDefault();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        try {
            const response = await fetch('/api/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user_id,
                    password,
                    confirmPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessPassword(true);
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
                    <form action="" method="post" onSubmit={handleSubmit} className="h-full">
                        <div className="flex flex-col justify-between h-full">
                            <FloatingLabelInput
                                id="password"
                                name="password"
                                type="password"
                                label="Mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <FloatingLabelInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirmer mot de passe"
                                value={formData.confirmPassword}
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
