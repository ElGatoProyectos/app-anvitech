"use client";
import { useToastDefault, useToastDestructive } from "@/app/hooks/toast.hook";
import { postImage } from "@/app/http/api.http";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

function FormRegisterUserMassive() {
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const session = useSession();

  async function handleRegistrarDataMassive(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (
        session.data?.user.role === "admin" ||
        session.data?.user.role === "superadmin"
      ) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        await postImage("users/file", formData, session.data);
        setLoading(false);
        useToastDefault("Ok", "Registro masivo realizado con exito");
      }
    } catch (error) {
      useToastDestructive("Error", "Error al procesar el archivo excel");
      setLoading(false);
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg">
      <div className="mb-8">
        <h1 className="text-lg font-semibold">
          Registrar usuarios de manera masiva
        </h1>
      </div>

      {session.data?.user.role === "admin" ||
        (session.data?.user.role === "superadmin" && (
          <form
            onSubmit={handleRegistrarDataMassive}
            className="flex flex-col gap-8"
          >
            <div>
              Recuerde que el archivo debe tener un formato único, los usuarios
              que ya existan lanzaran un error.
              <Link
                target="_blank"
                download
                as="/files/formato_usuarios_carga_masiva.xlsx"
                href="/files/formato_usuarios_carga_masiva.xlsx"
                className="underline text-blue-600"
              >
                Descargar formato
              </Link>
            </div>
            <div className="flex flex-col gap-2  col-span-2">
              <Label>Archivo</Label>
              <Input
                type="file"
                accept=".xlsx"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </div>

            <div className="flex flex-col gap-2  col-span-2">
              <Button disabled={loading} type="submit">
                Registrar trabajador
              </Button>
            </div>
          </form>
        ))}
    </div>
  );
}

export default FormRegisterUserMassive;
