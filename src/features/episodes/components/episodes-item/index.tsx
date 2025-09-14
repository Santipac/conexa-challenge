import { Episode } from "@/shared/types/episodes";
import React from "react";
import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { XCircleIcon } from "lucide-react";

interface EpisodesItemProps {
  episode?: Episode;
  loading: boolean;
  error?: string | null;
}

export default function EpisodesItem({ episode, loading, error }: EpisodesItemProps) {
  if (loading || !episode) return <Skeleton className="w-full h-16" />;
  
  if (error)
    return (
      <section className="flex items-center gap-2 bg-card p-4 rounded-lg border border-destructive shadow shadow-destructive">
        <XCircleIcon className="w-4 h-4 text-destructive" />
        <CardTitle className="text-destructive">{error}</CardTitle>
      </section>
    );

  return (
    <section className="flex items-center justify-between flex-wrap gap-2 bg-card p-4 rounded-lg border shadow">
      <CardTitle>{episode.name}</CardTitle>
      <CardDescription>{episode.airDate}</CardDescription>
    </section>
  );
}
