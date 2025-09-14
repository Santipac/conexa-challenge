"use client";

import { useState } from "react";
import CharacterList from "../character-list";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

export default function CharacterLayout() {
  const [step, setStep] = useState(1);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="bg-accent border rounded-lg p-4 shadow flex gap-4">
      {isMobile ? (
        <CharacterList step={step} isMobile={isMobile} setStep={setStep} />
      ) : (
        <>
          <CharacterList step={1} isMobile={isMobile} setStep={setStep} />
          <CharacterList step={2} isMobile={isMobile} setStep={setStep} />
        </>
      )}
    </section>
  );
}
