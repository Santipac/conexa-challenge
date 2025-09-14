import { ApiEpisode, Episode } from "@/shared/types/episodes";

export const mockApiEpisode: ApiEpisode = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2",
  ],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z",
};

export const mockEpisode: Episode = {
  id: 1,
  name: "Pilot",
  airDate: "December 2, 2013",
};
