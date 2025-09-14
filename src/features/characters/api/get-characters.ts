import { characterMapper } from "@/features/characters/helpers/character-mapper";
import type { ApiCharacter, Character } from "@/shared/types/character";

interface GetCharacterParams {
    page: number;
  }
  
  interface CharacterInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  }
  
 interface GetApiResponse {
    info: CharacterInfo;
    results: ApiCharacter[];
 }

export interface GetCharactersResponse extends Pick<GetApiResponse, 'info'> {
    results: Character[];
}
  

  export async function getCharacters(params: GetCharacterParams): Promise<GetCharactersResponse> {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${params.page}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as GetApiResponse;
      const characters = data.results.map(characterMapper);

      return {
        results: characters,
        info: data.info,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching characters: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching characters');
    }
  }
  