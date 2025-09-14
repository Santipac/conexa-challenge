import CharacterLayout from "@/features/characters/components/character-layout";
import EpisodesLayout from "@/features/episodes/components/episodes-layout";
import ConvLayout from "@/shared/components/layouts/conv-layout";
import { TypographyH1 } from "@/shared/components/ui/typography";

export default function Home() {
  return (
    <ConvLayout>
      <main className="px-4 py-8 min-h-dvh space-y-6">
        <TypographyH1 classNames="text-left">Rick y Morty</TypographyH1>
        <CharacterLayout />
        <EpisodesLayout />
      </main>
    </ConvLayout>
  );
}
