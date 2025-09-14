"use client";
import { useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { CardTitle } from "@/shared/components/ui/card";
import { TypographyP } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import type { Character } from "@/shared/types/character";
import { CheckIcon } from "lucide-react";

interface CharacterItemProps {
  character: Character;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (character: Character) => void;
}

export default function CharacterItem({
  character,
  isSelected,
  isDisabled,
  onSelect,
}: CharacterItemProps) {
  const statusColor = useCallback(() => {
    switch (character.status) {
      case "Alive":
        return "default";
      case "Dead":
        return "destructive";
      default:
        return "secondary";
    }
  }, [character.status]);


  const translatedStatus = useCallback(() => {
    switch (character.status) {
      case "Alive":
        return "Vivo";
      case "Dead":
        return "Muerto";
      default:
        return "Desconocido";
    }
  }, [character.status]);

  const translatedSpecies = useCallback(() => {
    switch (character.species) {
      case "Human":
        return "Humano";
      case "Humanoid":
        return "Humanoide";
      case "unknown":
        return "Desconocido";
      //? There are more species, but the API Documentation doesn't provide them
      default:
        return character.species;
    }
  }, [character.species]);
  
  function handleOnSelect() {
    if (isDisabled) return;
    onSelect(character);
  }

  return (
    <article
      onClick={handleOnSelect}
      className={cn(
        "relative py-4 rounded-lg border shadow ",
        isSelected && "shadow-green-400 outline outline-green-400",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {isSelected && (
        <span className="absolute -top-2.5 -right-2.5 size-7 bg-green-500 rounded-full flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-white" />
        </span>
      )}
      <section className="flex items-center gap-2 px-2">
        <Image
          src={character.image}
          alt={character.name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <section className="flex flex-col gap-2">
          <CardTitle>{character.name}</CardTitle>
          <section className="flex gap-1">
            <Badge variant={statusColor()}>{translatedStatus()}</Badge>
            <span className="text-muted-foreground">-</span>
            <TypographyP>{translatedSpecies()}</TypographyP>
          </section>
        </section>
      </section>
    </article>
  );
}
