
import { HydrateClient } from "@/trpc/server";
import { EmailFilterInput } from "./_components/email-filter-input";
import { metadata } from "./layout";
import { EntryDescription } from "./_components/entry-description";
import Link from "next/link";

const MATCHES_URL = 'https://raw.githubusercontent.com/LoneRifle/crimbo/main/matches.json'
const REQUESTS_URL = 'https://raw.githubusercontent.com/LoneRifle/crimbo/main/requests.json'

type ItemRequest = Record<string, string> & {
  id: string
  description: string
  contact: Record<string, string>
}

type RequestMatch = ItemRequest & {
  id: string
  description: string
  contact: Record<string, string>
  matches: {
    passiton: Record<string, string>[]
    carousell: Record<string, string>[]
  }
}

const linkPassItOn = (id?: string) => 
  `https://www.passiton.org.sg/item-list?search_by=id&search_id=${id}`

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const email = searchParams?.email as string | undefined
  const showAll = searchParams?.showAll as string | undefined
  const matches: RequestMatch[] = await (await fetch(MATCHES_URL)).json()
  const requests: ItemRequest[] = await (await fetch(REQUESTS_URL)).json()
  const displayedMatches = email
    ? matches.filter(entry => entry.contact.email?.includes(email))
    : (showAll ? matches : [])
  const displayedRequests = email
    ? requests.filter(entry => entry.contact.email?.includes(email) && !matches.some(({ id }) => id === entry.id))
    : []
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#15162c] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Got <span className="text-[hsl(280,100%,70%)]">Lobang</span>?
          </h1>
          <h1 className="text-3xl tracking-tight p-6">
            {metadata.description}
          </h1>
          <EmailFilterInput />
          <div
            className="w-full flex flex-col gap-4 rounded-xl bg-white/5 p-4"
          >
            <div>
              {email ? <div className="px-2 text-xl font-bold">Matches</div> : (!showAll && <Link href="?showAll=true" className="px-2 text-xs text-slate-400">See all matches</Link>)}
              {
                displayedMatches.length === 0 
                  ? email && <div className="px-2 italic">No Matches Found</div>
                  : displayedMatches.map((entry) => {
                    return <div key={entry.id} className="p-2 my-2 rounded-lg bg-white/5">
                      <div className="font-bold">{entry.id} - {entry.name}</div>
                      <div className="text-sm grid grid-cols-1">
                        <span>&#x2709; <Link href={`?email=${entry.contact?.email}`}>{entry.contact?.email}</Link></span>
                        <span>&#x1F3E2; {entry.contact?.org}</span>
                      </div>
                      <EntryDescription {...entry} />
                      <div className="ml-4">
                        {entry.matches.passiton.map(match => {
                          return (<div key={match.id} className="my-2">
                            <div className="text-sm">
                              <span className="font-bold">{match.id} - {match.name}</span> (<a href={linkPassItOn(match.id)} target="_blank">PassItOn &#x1F517;</a>)
                            </div>
                            <div className="text-sm italic">{match.location}</div>
                            <div className="text-sm">{match.description}</div>
                          </div>)
                        })}
                      </div>
                    </div>
                  })
              }
            </div>
          </div>
          {email &&
            <div
              className="w-full flex flex-col gap-4 rounded-xl bg-white/5 p-4"
            >
              <div>
                <div className="px-2 text-xl font-bold">Unmatched Requests</div>
                {
                  displayedRequests.length === 0
                    ? email && <div className="px-2 italic">No Unmatched Requests</div>
                    : displayedRequests.map((entry) => {
                      return <div key={entry.id} className="p-2 my-2 rounded-lg bg-white/5">
                        <div className="font-bold">{entry.id} - {entry.name}</div>
                        <div className="text-sm grid grid-cols-1">
                          <span>&#x2709; <Link href={`?email=${entry.contact?.email}`}>{entry.contact?.email}</Link></span><span>&#x1F3E2; {entry.contact?.org}</span>
                        </div>
                        <EntryDescription {...entry} />
                      </div>
                    })
                }
              </div>
            </div>
          }
        </div>
      </main>
    </HydrateClient>
  );
}
