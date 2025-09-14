import { ApiEpisode, Episode } from "@/shared/types/episodes";
import { episodeMapper } from "../helpers/episode-mapper";

type GetEpisodeResponse = Episode;

export async function getEpisode(url: string): Promise<GetEpisodeResponse> {
  try {
    const response = await fetch(url, {
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
    const data = (await response.json()) as ApiEpisode;
    return episodeMapper(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching episodes: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching episodes");
  }
}
