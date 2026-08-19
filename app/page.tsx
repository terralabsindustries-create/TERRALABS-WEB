"use client";

import App from "../src/site/App";

// The whole site is one client-rendered tree, exactly as it was under Vite.
// Splitting it into real routes is a separate piece of work.
export default function Page() {
  return <App />;
}
