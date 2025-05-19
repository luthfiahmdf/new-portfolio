import { NextResponse } from 'next/server';

interface LanyardResponse {
  success: boolean;
  data: {
    discord_user: {
      id: string;
      username: string;
      discriminator: string;
    };
    discord_status?: 'online' | 'idle' | 'dnd' | 'offline';
    spotify: {
      artist: string;
      song: string;
      album_art_url: string
    }
    // Add other fields you need
  };
}

export async function GET() {
  try {
    const response = await fetch(
      'https://api.lanyard.rest/v1/users/885532309212762153',
      {
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Lanyard API error: ${response.status}`);
    }

    const data: LanyardResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Discord status fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord status' },
      { status: 500 }
    );
  }
}
