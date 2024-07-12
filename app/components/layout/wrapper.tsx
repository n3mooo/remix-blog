import clsx from "clsx";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div
      className={clsx(
        `relative flex flex-col w-full [&>section]:flex [&>section]:flex-col [&>section]:w-full [&>section]:gap-4 [&>section]:mx-auto [&>section]:max-w-4xl [&>section]:px-4 [&>section]:sm:px-6 [&>section]:relative [&>section]:min-h-[calc(100vh-8rem)] [&>section]:grow [&>section]:py-6 [&>section]:sm:py-12`,
      )}
    >
      {children}
    </div>
  );
}
