"use client";
import { useCallback, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import OrbAvatar from "../ui/orb";
import { Button } from "../ui/button";
import { TypographyP } from "../ui/typography";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { cn } from "@/shared/lib/utils";
import { useSelectedCharacters } from "@/shared/stores/use-selected-characters";
import { useCharactersList } from "@/shared/stores/use-characters-list";

export default function ConvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [hasError, setHasError] = useState(false);
  const { firstCharactersList } = useCharactersList();
  const { setCharacter } = useSelectedCharacters();

  const conversation = useConversation({
    clientTools: {
      selectFirstCharacter: () => setCharacter(firstCharactersList[0], 1),
      selectSecondCharacter: () => setCharacter(firstCharactersList[1], 2),
    },
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "agent_9001k54xcakyfnpvfh2rnmwxjenf",
        // The agentId should be stored in an environment variable, but for your local testing I decided to hardcode it. It's part of a free plan, so don't worry about the costs.
        connectionType: "websocket",
      });
    } catch {
      setHasError(true);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <section className="relative">
      {children}
      {isDesktop && (
        <div className="z-10 absolute top-4 right-0">
          <section
            className={cn(
              "bg-accent rounded-full p-2 shadow-sm flex items-center gap-4 hover:animate-none",
              conversation.status !== "connected" && "animate-pulse"
            )}
          >
            <OrbAvatar />
            {!hasError && conversation.status === "connected" && (
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                onClick={stopConversation}
              >
                Terminar llamada
              </Button>
            )}
            {!hasError && conversation.status === "disconnected" && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={startConversation}
              >
                Iniciar llamada con agente
              </Button>
            )}
            {hasError && (
              <section className="flex items-center gap-2">
                <TypographyP classNames="text-destructive text-sm font-semibold">
                  Error al iniciar la llamada
                </TypographyP>
              </section>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
