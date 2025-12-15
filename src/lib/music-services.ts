import type { Track } from "@/stores/use-music";

export async function searchMusic(query: string): Promise<Track[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to search");
    }

    return response.json();
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
