import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu</title>
      </Head>

      <Header />
      <Navbar />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  console.log(genre);

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    props: {
      results: request.results,
    },
  };
}
