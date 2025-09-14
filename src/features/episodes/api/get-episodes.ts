import { ApiEpisode, Episode } from "@/shared/types/episodes";
import { episodeMapper } from "../helpers/episode-mapper";

type GetEpisodesResponse = Episode[];

function extractEpisodeId(url: string): string {
  return url.split("/").pop() || "";
}

export function extractEpisodeIds(urls: string[]): string[] {
  return urls.map(extractEpisodeId).filter(Boolean);
}

export async function getEpisodes(episodeUrls: string[]): Promise<GetEpisodesResponse> {
  if (episodeUrls.length === 0) return [];

  try {
    const episodeIds = extractEpisodeIds(episodeUrls);
    const idsParam = episodeIds.join(",");
    const apiUrl = `https://rickandmortyapi.com/api/episode/${idsParam}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch episodes: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as ApiEpisode | ApiEpisode[];

    const episodes = Array.isArray(data) ? data : [data];

    return episodes.map(episodeMapper);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching episodes: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching episodes");
  }
}
