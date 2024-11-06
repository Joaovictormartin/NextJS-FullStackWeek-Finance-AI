import Image from "next/image";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/app/_components/ui/button";

const Login = async () => {
  const { userId } = await auth();

  if (userId) redirect("/");

  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          width={173}
          height={39}
          src="/logo.svg"
          alt="Finance AI"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button variant={"outline"}>
            <LogInIcon className="mr-2" /> Entrar com Google
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image
          fill
          src="/login.png"
          alt="Faça login"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
