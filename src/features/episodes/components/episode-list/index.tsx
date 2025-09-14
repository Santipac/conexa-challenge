"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { Episode } from "@/shared/types/episodes";
import EpisodesItem from "../episodes-item";
import { EPISODES_LIMIT } from "@/features/characters/constants/limit";

type EpisodeListProps = {
  title: string;
  episodes: string[];
  episodeMap: Record<string, Episode>;
  loading: boolean;
  error: string | null;
  accordionValue: string;
  className?: string;
  collapsible?: boolean;
} & (
  | { type?: "single"; defaultValue?: string }
  | { type: "multiple"; defaultValue?: string[] }
);

export default function EpisodeList({
  title,
  episodes,
  episodeMap,
  loading,
  error,
  accordionValue,
  className,
  type = "single",
  collapsible = false,
  defaultValue,
}: EpisodeListProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleEpisodes = showAll ? episodes : episodes.slice(0, EPISODES_LIMIT);
  const shouldShowButton = episodes.length > EPISODES_LIMIT;

  const accordionProps = type === "multiple" 
    ? { type: "multiple" as const, defaultValue: defaultValue as string[] }
    : { type: "single" as const, collapsible, defaultValue: defaultValue as string };

  return (
    <Accordion
      className={className}
      {...accordionProps}
    >
      <AccordionItem value={accordionValue}>
        <AccordionTrigger>
          {title} (total: {episodes.length})
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {visibleEpisodes.map((episodeUrl) => (
            <EpisodesItem
              key={episodeUrl}
              episode={episodeMap[episodeUrl]}
              loading={loading}
              error={error}
            />
          ))}
          {shouldShowButton && (
            <Button variant="ghost" onClick={() => setShowAll(!showAll)} size="lg">
              {showAll ? "Show less" : `Show all (${episodes.length})`}
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}