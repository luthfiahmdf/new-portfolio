
'use client';

import { useEffect, useRef, useState } from 'react';

type LanyardOpcode = 0 | 1 | 2 | 3 | 4;

interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

interface PresenceData {
  spotify?: SpotifyData;
  // kamu bisa tambahkan lagi properti lain dari Lanyard jika perlu
}

interface LanyardPacket {
  op: LanyardOpcode;
  t?: 'INIT_STATE' | 'PRESENCE_UPDATE';
  d: PresenceData;
}

export default function LanyardStatus() {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);

  const DISCORD_USER_ID = '885532309212762153'; // ganti dengan user ID kamu

  useEffect(() => {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to Lanyard');
      setStatus('connected');
    };

    socket.onmessage = (event) => {
      const packet: LanyardPacket = JSON.parse(event.data);

      if (packet.op === 1) {
        // Send subscribe payload
        socket.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: DISCORD_USER_ID,
            },
          })
        );
      }

      if (packet.t === 'INIT_STATE' || packet.t === 'PRESENCE_UPDATE') {
        setSpotify(packet.d.spotify ?? null);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected');
      setStatus('disconnected');
    };

    return () => socket.close();
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-lg font-bold mb-2">Lanyard WebSocket</h2>
      <p>Status: {status}</p>

      {spotify ? (
        <div className="mt-4">
          <p className="text-sm">🎵 Now playing on Spotify:</p>
          <h3 className="text-md font-semibold">{spotify.song}</h3>
          <p className="text-xs">{spotify.artist}</p>
        </div>
      ) : (
        <p className="text-sm mt-2">Not listening to Spotify.</p>
      )}
    </div>
  );
}

