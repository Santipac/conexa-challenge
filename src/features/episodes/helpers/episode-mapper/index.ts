import type { ApiEpisode, Episode } from "@/shared/types/episodes"

export const episodeMapper = (episode: ApiEpisode): Episode => {
    return {
        id: episode.id,
        name: episode.name,
        airDate: episode.air_date,
    }
}