import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { TypographyH2, TypographyP } from "@/shared/components/ui/typography";
import { useCharacters } from "../../hooks/use-characters";
import CharacterItem from "../character-item";
import { useSelectedCharacters } from "@/shared/stores/use-selected-characters";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, XCircle } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { Character } from "@/shared/types/character";

interface CharacterListProps {
  step: number;
  isMobile: boolean;
  setStep: (step: number) => void;
}

export default function CharacterList({
  step,
  isMobile,
  setStep,
}: CharacterListProps) {
  const { firstCharacter, secondCharacter, setCharacter } =
    useSelectedCharacters();
  const {
    characters,
    isPending,
    error,
    currentPage,
    totalPages,
    handleOnNextPage,
    handleOnPreviousPage,
    onRetry,
  } = useCharacters(step);

  function handleOnSelect(character: Character) {
    setCharacter(character, step);
  }

  if (error) {
    return (
      <section className="h-[45dvh] md:h-[35dvh] flex-1 flex flex-col justify-between gap-2 bg-red-50 outline-destructive outline-2 rounded-lg p-4 shadow overflow-hidden">
        <TypographyH2>Elige tu personaje #{step}</TypographyH2>
        <section className="flex flex-col gap-4 items-center justify-center mt-8">
          <XCircle className="w-16 h-16 text-red-500" />
          <TypographyP classNames="text-center text-lg leading-5 font-medium">
           {error}
          </TypographyP>
        </section>
        <Button
          size="lg"
          className="w-full"
          variant="destructive"
          onClick={onRetry}
        >
          Reintentar
        </Button>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-2 bg-card border rounded-lg p-4 shadow overflow-hidden">
      <TypographyH2>Elige tu personaje #{step}</TypographyH2>
      {isPending ? (
        <section className="m-2.5 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_) => (
            <Skeleton key={crypto.randomUUID()} className="w-full h-16" />
          ))}
        </section>
      ) : (
        <ScrollArea className="h-[45dvh] md:h-[35dvh]">
          <section className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {characters.map((character) => {
              const isSelected =
                firstCharacter?.id === character.id ||
                secondCharacter?.id === character.id;
              const isOpposite =
                (firstCharacter?.id === character.id && step === 2) ||
                (secondCharacter?.id === character.id && step === 1);
              return (
                <CharacterItem
                  key={crypto.randomUUID()}
                  character={character}
                  isSelected={isSelected}
                  isDisabled={isOpposite}
                  onSelect={handleOnSelect}
                />
              );
            })}
          </section>
        </ScrollArea>
      )}

      <section className="flex w-full items-center justify-center flex-wrap gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={handleOnPreviousPage}
          disabled={currentPage === 1 || isPending}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {isPending ? (
          <Skeleton className="w-10 h-4" />
        ) : (
          <TypographyP>
            {currentPage} / {totalPages}
          </TypographyP>
        )}
        <Button
          size="icon"
          variant="outline"
          onClick={handleOnNextPage}
          disabled={currentPage === totalPages || isPending}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </section>
      {isMobile && (
        <>
          {step === 2 && (
            <Button size="lg" onClick={() => setStep(1)}>
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Paso anterior</span>
            </Button>
          )}
          {step === 1 && (
            <Button
              size="lg"
              onClick={() => setStep(2)}
              disabled={firstCharacter === null}
            >
              <span>{step === 1 ? "Siguiente paso" : "Continuar"}</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          )}
        </>
      )}
    </section>
  );
}
