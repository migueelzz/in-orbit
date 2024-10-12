import logo from "../assets/in-orbit-logo.svg";
import letsStart from "../assets/lest-start-illustration.svg";

import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="Lets Start" />

      <p className="text-center max-w-xs text-sm text-zinc-300 leading-relaxed">
        Você ainda não cadastrou nenhuma meta, <br />que tal <a href="#" className="underline">cadastrar um</a> agora mesmo?
      </p>
      
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}