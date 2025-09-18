import type { StateCreator } from "zustand";
import type { Character } from "../types/character";
import { create } from "zustand";

interface CharactersListState {
    firstCharactersList: Character[];
    secondCharactersList: Character[];
}
interface CharactersListActions {
    setFirstCharactersList: (characters: Character[]) => void;
    setSecondCharactersList: (characters: Character[]) => void;
}

const state: StateCreator<CharactersListState & CharactersListActions> = (set) => ({
    firstCharactersList: [],
    secondCharactersList: [],
    setFirstCharactersList: (characters) => set({ firstCharactersList: characters }),
    setSecondCharactersList: (characters) => set({ secondCharactersList: characters }),
});

export const useCharactersList = create<CharactersListState & CharactersListActions>()(state);