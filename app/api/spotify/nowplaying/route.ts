import { NextResponse } from 'next/server'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
})

interface NowPlayingResponse {
  isPlaying: boolean
  title: string
  artist?: string
  albumImage?: string
  songUrl?: string
  type?: 'track' | 'episode' | 'ad' | 'unknown'
}

export async function GET() {
  try {
    // Refresh access token
    const { body: { access_token } } = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(access_token)

    // Get current playback state
    const { body } = await spotifyApi.getMyCurrentPlayingTrack()

    // Handle no content playing
    if (!body.is_playing || !body.item) {
      return NextResponse.json({
        isPlaying: false,
        title: 'No content currently playing',
        type: 'unknown'
      } satisfies NowPlayingResponse)
    }

    // Handle track
    if (body.currently_playing_type === 'track') {
      const track = body.item as SpotifyApi.TrackObjectFull
      return NextResponse.json({
        isPlaying: body.is_playing,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumImage: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
        type: 'track'
      } satisfies NowPlayingResponse)
    }

    // Handle podcast episode
    if (body.currently_playing_type === 'episode') {
      const episode = body.item as SpotifyApi.EpisodeObject
      return NextResponse.json({
        isPlaying: body.is_playing,
        title: episode.name,
        songUrl: episode.external_urls.spotify,
        type: 'episode'
      } satisfies NowPlayingResponse)
    }

    // Handle ad or other types
    return NextResponse.json({
      isPlaying: body.is_playing,
      title: 'Advertisement',
      type: 'ad'
    } satisfies NowPlayingResponse)

  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch playback state',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
