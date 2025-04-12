import { Track } from "@/stores/use-music";
import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: "YouTube API key not found" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&videoCategoryId=10&key=${YOUTUBE_API_KEY}&maxResults=10`
    );

    const data = await response.json();

    if (!data.items) {
      return NextResponse.json(
        { error: "Invalid YouTube API response" },
        { status: 502 }
      );
    }

    const tracks: Track[] = data.items.map((item: any) => ({
      id: `youtube-${item.id.videoId}`,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      cover: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: "youtube" as const,
    }));

    return NextResponse.json(tracks);
  } catch (error) {
    console.error("YouTube search failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch results from YouTube" },
      { status: 500 }
    );
  }
}
