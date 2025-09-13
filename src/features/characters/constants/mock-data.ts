import type { ApiCharacter, Character } from "@/shared/types/character";
import type { GetCharactersResponse } from "../api/get-characters";


export const mockCharacter: Character = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: "Alive",
    species: "Human",
    episodes: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
}

export const secondMockCharacter: Character = {
    ...mockCharacter,
    id: 2,
    name: "Morty Smith",
}

export const mockApiCharacter: ApiCharacter = {
    ...mockCharacter,
    created: "2025-01-01",
}


export const mockCharactersResponse: GetCharactersResponse = {
    results: [mockApiCharacter, secondMockCharacter],
    info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
    },
}