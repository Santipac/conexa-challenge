import { vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useCharacters } from ".";
import {
    getCharacters,
    type GetCharactersResponse,
} from "@/features/characters/api/get-characters";
import { mockCharactersResponse } from "../../constants/mock-data";

vi.mock('@/features/characters/api/get-characters', () => ({
    getCharacters: vi.fn()
}))

const mockGetCharacters = vi.mocked(getCharacters);

const mockCharacters: GetCharactersResponse = {
  ...mockCharactersResponse,
  info: {
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character?page=2",
    prev: null,
  },
};

describe("useCharacters", () => {
  beforeEach(() => {
    mockGetCharacters.mockResolvedValue(mockCharacters);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("useCharacters/InitialState", () => {
    it("should initialize with correct default values", () => {
      const { result } = renderHook(() => useCharacters());

      expect(result.current.characters).toEqual([]);
      expect(result.current.isPending).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.currentPage).toBe(1);
      expect(result.current.totalPages).toBe(0);
    });

    it("should fetch characters on mount", async () => {
      renderHook(() => useCharacters());

      expect(mockGetCharacters).toHaveBeenCalledWith({ page: 1 });
      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });

    it("should update state after successful fetch", async () => {
      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.characters).toEqual(mockCharactersResponse.results);
      expect(result.current.totalPages).toBe(42);
      expect(result.current.error).toBe(null);
    });

    it("should handle API errors correctly", async () => {
      const errorMessage = "Network error";
      mockGetCharacters.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.characters).toEqual([]);
    });
  });

  describe("useCharacters/Pagination", () => {
    it("should navigate to the next page", async () => {
      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      act(() => {
        result.current.handleOnNextPage();
      });
      expect(result.current.currentPage).toBe(2);
      expect(mockGetCharacters).toHaveBeenCalledWith({ page: 2 });
      expect(mockGetCharacters).toHaveBeenCalledTimes(2);
    });

    it("should navigate to the previous page", async () => {
      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      act(() => {
        result.current.handleOnNextPage();
      });

      await waitFor(() => {
        expect(result.current.currentPage).toBe(2);
      });

      act(() => {
        result.current.handleOnPreviousPage();
      });

      expect(result.current.currentPage).toBe(1);
      expect(mockGetCharacters).toHaveBeenCalledWith({ page: 1 });
    });
    it("should not navigate to the previous page if the current page is 1", async () => {
      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      act(() => {
        result.current.handleOnPreviousPage();
      });

      expect(result.current.currentPage).toBe(1);
      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });
    it("should not navigate to the beyond the last page", async () => {
      mockGetCharacters.mockResolvedValue({
        ...mockCharacters,
        info: {
          ...mockCharacters.info,
          pages: 1,
        },
      });
      const { result } = renderHook(() => useCharacters());

      await waitFor(() => {
        expect(result.current.totalPages).toBe(1);
      });

      act(() => {
        result.current.handleOnNextPage();
      });

      expect(result.current.currentPage).toBe(1);
      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });
  });

  describe("useCharacters/StateManagement", () => {
    it('should show loading state during page changes', async () => {
        const { result } = renderHook(() => useCharacters())
  
        await waitFor(() => {
          expect(result.current.isPending).toBe(false)
        })
  
        mockGetCharacters.mockImplementation(
          () => new Promise(resolve => 
            setTimeout(() => resolve(mockCharactersResponse), 100)
          )
        )
  
        act(() => {
          result.current.handleOnNextPage()
        })
  
        expect(result.current.isPending).toBe(true)
  
        await waitFor(() => {
          expect(result.current.isPending).toBe(false)
        })
    })
    it('should clear error state when retrying', async () => {
        
        mockGetCharacters.mockRejectedValueOnce(new Error('Network error'))
  
        const { result } = renderHook(() => useCharacters())
  
        await waitFor(() => {
          expect(result.current.error).toBe('Network error')
        })
  
        
        mockGetCharacters.mockResolvedValueOnce(mockCharactersResponse)
  
        act(() => {
          result.current.onRetry()
        })
  
        await waitFor(() => {
          expect(result.current.error).toBe(null)
          expect(result.current.characters).toEqual(mockCharactersResponse.results)
        })
    })
    it('should retry fetching current page when onRetry is called', async () => {
        const { result } = renderHook(() => useCharacters())
  
        await waitFor(() => {
          expect(result.current.isPending).toBe(false)
        })
  
       
        act(() => {
          result.current.handleOnNextPage()
        })
        act(() => {
          result.current.handleOnNextPage()
        })
  
        await waitFor(() => {
          expect(result.current.currentPage).toBe(3)
        })
  
        // Reset mock for only count the retry call
        vi.clearAllMocks()
        mockGetCharacters.mockResolvedValue(mockCharactersResponse)
  
        act(() => {
          result.current.onRetry()
        })
  
        expect(mockGetCharacters).toHaveBeenCalledWith({ page: 3 })
        expect(mockGetCharacters).toHaveBeenCalledTimes(1)
    })
    it('should preserve page state during error and recovery', async () => {
        const { result } = renderHook(() => useCharacters())
  
        await waitFor(() => {
          expect(result.current.isPending).toBe(false)
        })
  
        act(() => {
          result.current.handleOnNextPage()
        })
  
        await waitFor(() => {
          expect(result.current.currentPage).toBe(2)
        })
  

        mockGetCharacters.mockRejectedValueOnce(new Error('Page 3 error'))
  
        act(() => {
          result.current.handleOnNextPage()
        })
  
        await waitFor(() => {
          expect(result.current.error).toBe('Page 3 error')
        })
  
        expect(result.current.currentPage).toBe(3)
      })
  });
});
