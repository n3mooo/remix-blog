import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "@remix-run/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export interface AppProvidersProps {
  children: React.ReactNode;
  themeProps?: Partial<ThemeProviderProps>;
}

export default function AppProviders({
  children,
  themeProps,
}: AppProvidersProps) {
  const navigate = useNavigate();

  return (
      <NextUIProvider navigate={navigate}>
        <NextThemesProvider {...themeProps}>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
  );
}
