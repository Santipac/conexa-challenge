import { describe, it, expect } from 'vitest'
import { characterMapper } from '.'
import { mockApiCharacter, mockCharacter } from '../../constants/mock-data'

describe('characterMapper', () => {
  it("The returned object shouldn't have any unnecesary property", () => {

    const result = characterMapper(mockApiCharacter)

    expect(result).toEqual(mockCharacter)
  })
})