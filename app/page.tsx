'use client'

import { GithubStats } from "@/components/githubCalendar";
import { GithubCard } from "@/components/GithubCard";
import { OnlineCard } from "@/components/onlineCard";
import { ProfileCard } from "@/components/profileCard";
import { SpotifyCard } from "@/components/spotifyCard";
import { TimeCard } from "@/components/timeCard";
import { ToggleCard } from "@/components/ToggleCard";


export default function Home() {


  return (
    <main className="container mx-auto px-4 py-12 xl:px-20 flex flex-col gap-4 ">
      {/* Top Row - Profile Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 ">
        <ProfileCard />

        <ToggleCard />
      </section>

      {/* Bottom Grid - Content Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <SpotifyCard />
        <TimeCard />
        <div className=" flex flex-col gap-2">
          <OnlineCard />
          <GithubStats />
        </div>

      </section>
      <div className="flex flex-col md:flex-row items-center justify-start gap-4">
        <GithubCard />
        <GithubCard />

      </div>
    </main>
  );
}
