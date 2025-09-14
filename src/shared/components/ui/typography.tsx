import { cn } from "@/shared/lib/utils";

export function TypographyH1({ children, classNames }: { children: React.ReactNode, classNames?: string }) {
  return (
    <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", classNames)}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, classNames }: { children: React.ReactNode, classNames?: string }) {
  return (
    <h2 className={cn("scroll-m-20 text-lg font-semibold tracking-tight first:mt-0", classNames)}>
      {children}
    </h2>
  );
}

export function TypographyP({ children, classNames }: { children: React.ReactNode, classNames?: string }) {
  return <p className={cn("leading-7 text-muted-foreground", classNames)}>{children}</p>;
}
