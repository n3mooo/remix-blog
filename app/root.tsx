import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "~/styles/global.css";
import { AppProviders } from "~/components/context";
import { Footer, Header, Wrapper } from "~/components/layout";
import { getUser } from "./apis/session.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light' suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProviders themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex min-h-screen flex-col">
            <Header />

            <main className="flex flex-row w-full flex-nowrap justify-center grow overflow-x-hidden">
              <Wrapper>{children}</Wrapper>
            </main>

            <Footer />
          </div>
        </AppProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
