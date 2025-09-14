"use client";

import { getCharacters } from "@/features/characters/api/get-characters";
import { useCharactersList } from "@/shared/stores/use-characters-list";
import type { Character } from "@/shared/types/character";
import { useEffect, useRef, useState } from "react";

export function useCharacters() {
  const [isPending, setIsPending] = useState(true);
  const { characters, setCharacters } = useCharactersList();
  const [error, setError] = useState<string | null>(null);

  const totalPages = useRef(0);

  const [page, setPage] = useState(1);

  async function onFetchCharacters() {
    try {
      setIsPending(true);
      setError(null);
      const characters = await getCharacters({ page });
      setCharacters(characters.results);
      totalPages.current = characters.info.pages;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado al obtener los personajes';
      setError(errorMessage);
      setCharacters([]);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    onFetchCharacters();
  }, [page]);

  function handleOnNextPage() {
    if (page === totalPages.current) return;
    setPage(page + 1);
  }

  function handleOnPreviousPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  return {
    characters,
    isPending,
    error,
    currentPage: page,
    totalPages: totalPages.current,
    handleOnNextPage,
    handleOnPreviousPage,
    onRetry: onFetchCharacters,
  };
}
