import { describe, it, expect } from 'vitest'
import { episodeMapper } from '.'
import { mockApiEpisode, mockEpisode } from '../../constants/mock-data'

describe('episodeMapper', () => {
  it("The returned object shouldn't have any unnecesary property", () => {

    const result = episodeMapper(mockApiEpisode)

    expect(result).toEqual(mockEpisode)
  })
})