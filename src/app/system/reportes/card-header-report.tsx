"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToastDefault, useToastDestructive } from "@/app/hooks/toast.hook";
import { toast } from "@/components/ui/use-toast";

function CardHeaderReport() {
  // define states

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");

  // define functions

  async function fetchGenerateReport() {
    try {
      setIsLoading(!isLoading);

      setTimeout(() => {
        setIsLoading(!isLoading);
      }, 2000);
    } catch (error) {}
  }

  async function handleGenerateReport() {
    if (password !== "admin") {
      console.log("error");
      useToastDestructive("Error", "Credenciales incorrectas");
    } else {
      useToastDefault(
        "Ok",
        <div className="w-fit">
          <span className="animate-pulse">Generando reporte</span>
        </div>
      );

      setTimeout(() => {
        useToastDefault("Ok", "Reporte generado con exito");
      }, 2000);

      await fetchGenerateReport();
    }
  }
  return (
    <Dialog>
      <div className="items-start justify-between flex ">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-lg font-semibold">
            Reportes Generales
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <DialogTrigger asChild>
            <Button className=" ">Generar reporte</Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Generare reporte</DialogTitle>
          <DialogDescription className="mt-2">
            Recuerde que la generacion de reporte es semanal, se recomienda
            hacerlo los viernes o sabados
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Contrasena</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
          />
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button onClick={handleGenerateReport} type="submit">
              Generar reporte
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CardHeaderReport;
