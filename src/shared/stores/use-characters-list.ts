import { StateCreator } from "zustand";
import { Character } from "../types/character";
import { create } from "zustand";

interface CharactersListState {
    characters: Character[];
}
interface CharactersListActions {
    setCharacters: (characters: Character[]) => void;
}

const state: StateCreator<CharactersListState & CharactersListActions> = (set) => ({
    characters: [],
    setCharacters: (characters) => set({ characters }),
});

export const useCharactersList = create<CharactersListState & CharactersListActions>()(state);