import { NextResponse } from 'next/server'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // 1. Verifikasi state (penting untuk keamanan)


  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code missing' },
      { status: 400 }
    )
  }

  try {
    // 2. Tukar code dengan token
    const { body } = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token, expires_in } = body

    // 3. Simpan token (contoh: di database atau cookies)
    console.log('✅ Tokens received:')
    console.log('Access Token:', access_token)
    console.log('Refresh Token:', refresh_token) // SIMPAN INI UNTUK PEMAKAIAN FUTURE!
    console.log('Expires In:', expires_in, 'seconds')

    // 4. Redirect ke halaman sukses dengan token
    const response = NextResponse.redirect('http://127.0.0.1:3000/?auth=success')

    // Opsional: Set cookie (untuk development saja)


    return response

  } catch (error) {
    console.error('❌ Token exchange failed:', error)
    return NextResponse.redirect('http://127.0.0.1:3000/?error=auth_failed')
  }
}
