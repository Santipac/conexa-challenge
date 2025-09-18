"use client";

import { getCharacters } from "@/features/characters/api/get-characters";
import { useCharactersList } from "@/shared/stores/use-characters-list";
import { useEffect, useRef, useState } from "react";

export function useCharacters(step: number = 1) {
  const [isPending, setIsPending] = useState(true);
  const {
    firstCharactersList,
    secondCharactersList,
    setFirstCharactersList,
    setSecondCharactersList
  } = useCharactersList();
  const [error, setError] = useState<string | null>(null);

  const totalPages = useRef(0);

  const [page, setPage] = useState(1);

  const characters = step === 1 ? firstCharactersList : secondCharactersList;
  const setCharacters = step === 1 ? setFirstCharactersList : setSecondCharactersList;

  async function onFetchCharacters() {
    try {
      setIsPending(true);
      setError(null);
      const charactersData = await getCharacters({ page });
      setCharacters(charactersData.results);
      totalPages.current = charactersData.info.pages;
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
