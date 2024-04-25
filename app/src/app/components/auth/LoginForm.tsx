import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signIn('credentials', {
            redirect: false,
            email,
            password
        });
    } catch (error) {
        console.error('Sign in failed', error);
    }
  };

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
