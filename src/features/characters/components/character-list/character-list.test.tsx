import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CharacterList from ".";
import { mockCharacter, secondMockCharacter } from "../../constants/mock-data";
import type { Character } from "@/shared/types/character";

vi.mock("../../hooks/use-characters");
vi.mock("@/shared/stores/use-selected-characters");
vi.mock("../character-item", () => ({
  default: ({ character, isSelected, isDisabled, onSelect }: {
    character: Character;
    isSelected: boolean;
    isDisabled: boolean;
    onSelect: (character: Character) => void;
  }) => (
    <div
      data-testid={`character-item-${character.id}`}
      onClick={() => onSelect(character)}
      className={`${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
    >
      {character.name}
    </div>
  ),
}));

vi.mock("@/shared/components/ui/scroll-area", () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-area">{children}</div>
  ),
}));

vi.mock("@/shared/components/ui/typography", () => ({
  TypographyH2: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  TypographyP: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
}));

vi.mock("@/shared/components/ui/button", () => ({
  Button: ({ children, onClick, disabled }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock("@/shared/components/ui/skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));

vi.mock("lucide-react", () => ({
  ChevronLeftIcon: () => <span data-testid="chevron-left-icon">←</span>,
  ChevronRightIcon: () => <span data-testid="chevron-right-icon">→</span>,
  XCircle: () => <span data-testid="x-circle-icon">✕</span>,
}));

describe("CharacterList", () => {
  const defaultProps = {
    step: 1,
    isMobile: false,
    setStep: vi.fn(),
  };

  const mockUseCharacters = {
    characters: [mockCharacter, secondMockCharacter],
    isPending: false,
    error: null,
    currentPage: 1,
    totalPages: 3,
    handleOnNextPage: vi.fn(),
    handleOnPreviousPage: vi.fn(),
    onRetry: vi.fn(),
  };

  const mockUseSelectedCharacters = {
    firstCharacter: null,
    secondCharacter: null,
    setCharacter: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const { useCharacters } = await import("../../hooks/use-characters");
    const { useSelectedCharacters } = await import("@/shared/stores/use-selected-characters");
    
    vi.mocked(useCharacters).mockReturnValue(mockUseCharacters);
    vi.mocked(useSelectedCharacters).mockReturnValue(mockUseSelectedCharacters);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("CharacterList/Rendering", () => {
    it("should render character list with correct title", () => {
      render(<CharacterList {...defaultProps} />);
      
      expect(screen.getByRole("heading")).toHaveTextContent("Elige tu personaje #1");
    });

    it("should render loading state", async () => {
      const { useCharacters } = await import("../../hooks/use-characters");
      vi.mocked(useCharacters).mockReturnValue({
        ...mockUseCharacters,
        isPending: true,
      });

      render(<CharacterList {...defaultProps} />);

      expect(screen.getAllByTestId("skeleton")).toHaveLength(5);
    });

    it("should render error state", async () => {
      const { useCharacters } = await import("../../hooks/use-characters");
      vi.mocked(useCharacters).mockReturnValue({
        ...mockUseCharacters,
        error: "Failed to fetch characters",
        characters: [],
      });

      render(<CharacterList {...defaultProps} />);

      expect(screen.getByText("Failed to fetch characters")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("should render character items when loaded", () => {
      render(<CharacterList {...defaultProps} />);

      expect(screen.getByTestId("character-item-1")).toBeInTheDocument();
      expect(screen.getByTestId("character-item-2")).toBeInTheDocument();
    });
  });

  describe("CharacterList/Selection", () => {
    it("should call setCharacter when character is selected", () => {
      render(<CharacterList {...defaultProps} />);

      fireEvent.click(screen.getByTestId("character-item-1"));

      expect(mockUseSelectedCharacters.setCharacter).toHaveBeenCalledWith(mockCharacter, 1);
    });

    it("should mark selected character correctly", async () => {
      const { useSelectedCharacters } = await import("@/shared/stores/use-selected-characters");
      vi.mocked(useSelectedCharacters).mockReturnValue({
        ...mockUseSelectedCharacters,
        firstCharacter: mockCharacter,
      });

      render(<CharacterList {...defaultProps} />);

      expect(screen.getByTestId("character-item-1")).toHaveClass("selected");
    });

    it("should disable character when selected in opposite step", async () => {
      const { useSelectedCharacters } = await import("@/shared/stores/use-selected-characters");
      vi.mocked(useSelectedCharacters).mockReturnValue({
        ...mockUseSelectedCharacters,
        firstCharacter: mockCharacter,
      });

      render(<CharacterList {...defaultProps} step={2} />);

      expect(screen.getByTestId("character-item-1")).toHaveClass("disabled");
    });
  });

  describe("CharacterList/Pagination", () => {
    it("should handle pagination navigation", () => {
      render(<CharacterList {...defaultProps} />);

      const nextButton = screen.getByTestId("chevron-right-icon").closest("button");
      fireEvent.click(nextButton!);

      expect(mockUseCharacters.handleOnNextPage).toHaveBeenCalledTimes(1);
    });

    it("should disable buttons appropriately", () => {
      render(<CharacterList {...defaultProps} />);

      const prevButton = screen.getByTestId("chevron-left-icon").closest("button");
      expect(prevButton).toBeDisabled();
    });
  });

  describe("CharacterList/Mobile", () => {
    it("should show mobile navigation when isMobile is true", () => {
      render(<CharacterList {...defaultProps} isMobile={true} step={2} />);

      expect(screen.getByText("Previous step")).toBeInTheDocument();
    });

    it("should handle step navigation", () => {
      const setStepMock = vi.fn();
      render(<CharacterList {...defaultProps} isMobile={true} step={2} setStep={setStepMock} />);

      fireEvent.click(screen.getByText("Previous step"));

      expect(setStepMock).toHaveBeenCalledWith(1);
    });

    it("should disable Next step when no character selected", () => {
      render(<CharacterList {...defaultProps} isMobile={true} step={1} />);

      const nextButton = screen.getByText("Next step").closest("button");
      expect(nextButton).toBeDisabled();
    });
  });

  describe("CharacterList/Error Handling", () => {
    it("should call retry function when retry button clicked", async () => {
      const { useCharacters } = await import("../../hooks/use-characters");
      const onRetryMock = vi.fn();
      vi.mocked(useCharacters).mockReturnValue({
        ...mockUseCharacters,
        error: "Network error",
        onRetry: onRetryMock,
      });

      render(<CharacterList {...defaultProps} />);

      fireEvent.click(screen.getByRole("button", { name: /retry/i }));

      expect(onRetryMock).toHaveBeenCalledTimes(1);
    });
  });
});
