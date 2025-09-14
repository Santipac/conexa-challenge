"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { useSelectedCharacters } from "@/shared/stores/use-selected-characters";
import { getEpisodes } from "../../api/get-episodes";
import { Episode } from "@/shared/types/episodes";
import EpisodeAccordion from "../episode-list";


export default function EpisodesLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { firstCharacter, secondCharacter } = useSelectedCharacters();
  const [episodes, setEpisodes] = useState<Record<string, Episode>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sharedEpisodes = useMemo(() => {
    if (!firstCharacter?.episodes || !secondCharacter?.episodes) return [];
    return firstCharacter?.episodes.filter((episode) =>
      secondCharacter?.episodes.includes(episode)
    );
  }, [firstCharacter?.id, secondCharacter?.id]);

  const allEpisodeUrls = useMemo(() => {
    const urls = new Set<string>();
    firstCharacter?.episodes?.forEach((url) => urls.add(url));
    secondCharacter?.episodes?.forEach((url) => urls.add(url));
    return Array.from(urls);
  }, [firstCharacter?.episodes, secondCharacter?.episodes]);

  useEffect(() => {
    if (allEpisodeUrls.length === 0) return;

    const fetchAllEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedEpisodes = await getEpisodes(allEpisodeUrls);

        const episodeMap = fetchedEpisodes.reduce((acc, episode) => {
          const episodeUrl = `https://rickandmortyapi.com/api/episode/${episode.id}`;
          acc[episodeUrl] = episode;
          return acc;
        }, {} as Record<string, Episode>);

        setEpisodes(episodeMap);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocurrió un error inesperado al obtener los episodios";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEpisodes();
  }, [allEpisodeUrls]);

  if (!firstCharacter?.id || !secondCharacter?.id) return null;


  return (
    <section className="bg-accent border rounded-lg p-4 shadow flex flex-col md:grid md:grid-cols-3 gap-4">
      <EpisodeAccordion
        title={`${firstCharacter.name} - Episodios`}
        episodes={firstCharacter.episodes}
        episodeMap={episodes}
        loading={loading}
        error={error}
        accordionValue="item-1"
        className="flex-1"
        type="single"
        collapsible={isMobile}
        defaultValue="item-1"
      />
      <EpisodeAccordion
        title="Personaje #1 y #2 - Episodios compartidos"
        episodes={sharedEpisodes}
        episodeMap={episodes}
        loading={loading}
        error={error}
        accordionValue="item-1"
        className="flex-1"
        type="single"
        collapsible={isMobile}
        defaultValue="item-1"
      />
      <EpisodeAccordion
        title={`${secondCharacter.name} - Episodios`}
        episodes={secondCharacter.episodes}
        episodeMap={episodes}
        loading={loading}
        error={error}
        accordionValue="item-1"
        className="flex-1"
        type="single"
        collapsible={isMobile}
        defaultValue="item-1"
      />
    </section>
  );
}
