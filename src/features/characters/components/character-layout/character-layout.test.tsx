import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CharacterLayout from ".";

vi.mock("@/shared/hooks/use-media-query");
vi.mock("../character-list", () => ({
  default: ({ step, isMobile, setStep }: { 
    step: number; 
    isMobile: boolean; 
    setStep: (step: number) => void;
  }) => (
    <div data-testid={`character-list-step-${step}`} data-ismobile={isMobile.toString()}>
      Character List Step {step}
    </div>
  ),
}));

describe("CharacterLayout", () => {
  const mockUseMediaQuery = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();
    const { useMediaQuery } = await import("@/shared/hooks/use-media-query");
    vi.mocked(useMediaQuery).mockImplementation(mockUseMediaQuery);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("CharacterLayout/Desktop", () => {
    it("should render two character lists on desktop", () => {
      mockUseMediaQuery.mockReturnValue(false);

      render(<CharacterLayout />);

      expect(screen.getByTestId("character-list-step-1")).toBeInTheDocument();
      expect(screen.getByTestId("character-list-step-2")).toBeInTheDocument();
      expect(screen.getByTestId("character-list-step-1")).toHaveAttribute("data-ismobile", "false");
      expect(screen.getByTestId("character-list-step-2")).toHaveAttribute("data-ismobile", "false");
    });

    it("should call useMediaQuery with correct breakpoint", () => {
      mockUseMediaQuery.mockReturnValue(false);

      render(<CharacterLayout />);

      expect(mockUseMediaQuery).toHaveBeenCalledWith("(max-width: 768px)");
    });
  });

  describe("CharacterLayout/Mobile", () => {
    it("should render single character list on mobile", () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(<CharacterLayout />);

      expect(screen.getByTestId("character-list-step-1")).toBeInTheDocument();
      expect(screen.queryByTestId("character-list-step-2")).not.toBeInTheDocument();
      expect(screen.getByTestId("character-list-step-1")).toHaveAttribute("data-ismobile", "true");
    });

    it("should start with step 1 by default on mobile", () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(<CharacterLayout />);

      const characterList = screen.getByTestId("character-list-step-1");
      expect(characterList).toBeInTheDocument();
      expect(characterList).toHaveTextContent("Character List Step 1");
    });
  });

  describe("CharacterLayout/Responsive", () => {
    it("should have correct container styling", () => {
      mockUseMediaQuery.mockReturnValue(false);

      const { container } = render(<CharacterLayout />);
      const section = container.firstChild;

      expect(section).toHaveClass(
        "bg-accent border rounded-lg p-4 shadow flex gap-4"
      );
    });
  });
});
