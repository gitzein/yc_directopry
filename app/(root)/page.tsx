import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const [{ data: posts }, editorPosts] = await Promise.all([
    sanityFetch({ query: STARTUPS_QUERY, params }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-s-picks",
    }),
  ]);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      {editorPosts?.select && editorPosts?.select?.length > 0 && (
        <>
          <hr className="divider" />
          <section className="section_container">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid">
              {editorPosts?.select?.map((post, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </section>
        </>
      )}
      <SanityLive />
    </>
  );
}
