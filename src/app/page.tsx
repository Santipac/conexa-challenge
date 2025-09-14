import CharacterLayout from "@/features/characters/components/character-layout";
import { TypographyH1 } from "@/shared/components/ui/typography";

export default function Home() {
  return (
    <main className="px-4 py-8 min-h-dvh space-y-6">
      <TypographyH1>Rick and Morty</TypographyH1>
      <CharacterLayout />
    </main>
  );
}
