import React from "react";
import { createClient } from "@/prismicio";

import NavBar from "@/components/NavBar";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header className="top-0 left-0 w-full z-50 mx-auto md:sticky">
      <NavBar settings={settings} />
    </header>
  );
}
