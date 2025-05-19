import { NextResponse } from 'next/server'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

export async function GET() {
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state'
  ]

  const state = crypto.randomUUID()
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)

  return NextResponse.redirect(authorizeURL)
}
