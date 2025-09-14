import type { ApiCharacter, Character } from "@/shared/types/character"


export const characterMapper = (character: ApiCharacter): Character => {
    return {
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species,
        episodes: character.episode
    }
}