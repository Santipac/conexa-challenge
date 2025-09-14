import { create, type StateCreator } from "zustand";
import type { Character } from "../types/character";

interface SelectedCharactersState {
  firstCharacter: Character | null;
  secondCharacter: Character | null;
}

interface SelectedCharactersActions {
  setCharacter: (character: Character, listId: number) => void;
  clearSelectedCharacters: () => void;
}

const state: StateCreator<
  SelectedCharactersState & SelectedCharactersActions
> = (set, get) => ({
  firstCharacter: null,
  secondCharacter: null,
  setCharacter: (character, listId) => {
    if (listId === 1) {
      if (get().firstCharacter?.id === character.id) {
        set({ firstCharacter: null });
        return;
      }
      set({ firstCharacter: character });
      return;
    }

    if (get().secondCharacter?.id === character.id) {
      set({ secondCharacter: null });
      return;
    }
    
    set({ secondCharacter: character });
  },
  clearSelectedCharacters: () =>
    set({ firstCharacter: null, secondCharacter: null }),
});

export const useSelectedCharacters = create<
  SelectedCharactersState & SelectedCharactersActions
>()(state);
