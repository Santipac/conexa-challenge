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
      const data = (await response.json()) as GetApiResponse;
      const characters = data.results.map(characterMapper);
  
      return {
        results: characters,
        info: data.info,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  