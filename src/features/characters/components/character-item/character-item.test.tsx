import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import CharacterItem from ".";
import { mockCharacter } from "../../constants/mock-data";

// Mock Next Image Component for avoid runtime error
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("lucide-react", () => ({
    CheckIcon: () => <span data-testid="check-icon">✓</span>,
  }));

vi.mock("@/shared/components/ui/badge", () => ({
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <div data-testid="badge"  className={`${variant === 'default' ? 'bg-emerald-100' : variant === 'destructive' ? 'bg-destructive' : 'bg-secondary'}`}>
      {children}
    </div>
  ),
}));


describe("CharacterItem", () => {
  const defaultProps = {
    character: mockCharacter,
    isSelected: false,
    isDisabled: false,
    onSelect: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("CharacterItem/Rendering", () => {
    it("should render the character item", () => {
      render(<CharacterItem {...defaultProps} />);
      expect(screen.getByRole("paragraph")).toHaveTextContent("Human");
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        mockCharacter.image
      );
      expect(screen.getByRole("img")).toHaveAttribute("alt", "Rick Sanchez");
    });

    it("should not render check icon when not selected", () => {
      render(<CharacterItem {...defaultProps} />);

      expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    });

    it("should render check icon when selected", () => {
      render(<CharacterItem {...defaultProps} isSelected={true} />);

      expect(screen.queryByTestId("check-icon")).toBeInTheDocument();
    });
  });
  describe("CharacterItem/Interactions", () => {
    it("should call onSelect when clicked and not disabled", () => {
      const onSelectMock = vi.fn();
      render(<CharacterItem {...defaultProps} onSelect={onSelectMock} />);

      fireEvent.click(screen.getByRole("article", { hidden: true }));

      expect(onSelectMock).toHaveBeenCalledWith(mockCharacter);
      expect(onSelectMock).toHaveBeenCalledTimes(1);
    });

    it("should not call onSelect when disabled", () => {
      const onSelectMock = vi.fn();
      render(
        <CharacterItem
          {...defaultProps}
          onSelect={onSelectMock}
          isDisabled={true}
        />
      );

      fireEvent.click(screen.getByRole("article", { hidden: true }));

      expect(onSelectMock).not.toHaveBeenCalled();
    });

  });
  describe("CharacterItem/Status", () => {
    it('should render "default" variant for Alive status', () => {
      const aliveCharacter = { ...mockCharacter, status: "Alive" as const };
      render(<CharacterItem {...defaultProps} character={aliveCharacter} />);

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveClass("bg-emerald-100");
      expect(badge).toHaveTextContent("Vivo");
    });

    it('should render "destructive" variant for Dead status', () => {
      const deadCharacter = { ...mockCharacter, status: "Dead" as const };
      render(<CharacterItem {...defaultProps} character={deadCharacter} />);

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveClass("bg-destructive");
      expect(badge).toHaveTextContent("Muerto");
    });

    it('should render "secondary" variant for unknown status', () => {
      const unknownCharacter = { ...mockCharacter, status: "unknown" as const };
      render(<CharacterItem {...defaultProps} character={unknownCharacter} />);

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveClass("bg-secondary");
      expect(badge).toHaveTextContent("Desconocido");
    });
  });
});
