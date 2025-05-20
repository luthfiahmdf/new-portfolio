
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

type DiscordStatus = 'idle' | 'offline' | 'dnd' | 'online';
interface PresenceData {
  spotify?: SpotifyData;
  discord_status?: DiscordStatus;
  listening_to_spotify?: boolean
}

interface LanyardPacket {
  op: LanyardOpcode;
  t?: 'INIT_STATE' | 'PRESENCE_UPDATE';
  d: PresenceData;
}

export function useLanyard(userId: string): {
  spotify: SpotifyData | null;
  connected: boolean;
  discordStatus?: DiscordStatus | null;
  isListening: boolean
} {
  const socketRef = useRef<WebSocket | null>(null);
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [connected, setConnected] = useState(false);
  const [discordStatus, setDiscordStatus] = useState<DiscordStatus | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false)

  useEffect(() => {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onmessage = (event) => {
      const packet: LanyardPacket = JSON.parse(event.data);

      if (packet.op === 1) {
        socket.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: userId,
            },
          })
        );
      }

      if (packet.t === 'INIT_STATE' || packet.t === 'PRESENCE_UPDATE') {
        setSpotify(packet.d.spotify ?? null);
        setDiscordStatus(packet.d.discord_status ?? null);
        setIsListening(packet.d.listening_to_spotify ?? false)
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  return { spotify, connected, discordStatus, isListening };
}

