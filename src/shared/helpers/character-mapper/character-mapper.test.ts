import type { ApiCharacter, Character } from '@/shared/types/character'
import { describe, it, expect } from 'vitest'
import { characterMapper } from '.'



const mockApiCharacter: ApiCharacter = {
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  episodes: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
  ],
  created: '2025-01-01'
}

const mockCharacter: Character = {
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  episodes: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
  ],
}


describe('characterMapper', () => {
  it("The returned object shouldn't have the 'created' property", () => {

    const result = characterMapper(mockApiCharacter)

    expect(result).toEqual(mockCharacter)
  })
})