import { createClient } from "@/prismicio";
import Footer from "./Footer";

export default async function SettingsFetcher() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return <Footer settings={settings} />;
}
