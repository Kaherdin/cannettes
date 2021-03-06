import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import oauth from "axios-oauth-client";

export default function Home() {
  //npm install --save axios-oauth-client axios-token-interceptor axios

  // Helper to make Authenficated POST requests to Strapi with axios
  async function postAxiosAPI(path, data, userToken) {
    const requestUrl = getStrapiURL(path);
    const response = await axios.post(requestUrl, data, {
      headers: userToken && { Authorization: `Bearer ${userToken}` },
    });
    return response;
  }

  const getAuthorizationCode = oauth.client(axios.create(), {
    url: "https://api.intra.42.fr/oauth/authorize",
    grant_type: "authorization_code",
    client_id:
      "f5b5d42fac237f01e60e8141cfb7cad56c8a99d5a4128356f1846978f3ad7383",
    client_secret:
      "1707f43fe58bab0bb4c4413a61604804116c4b91a3e2513842412af72a4d14eb",
    redirect_uri:
      "https://api.intra.42.fr/oauth/authorize?client_id=f5b5d42fac237f01e60e8141cfb7cad56c8a99d5a4128356f1846978f3ad7383&redirect_uri=https%3A%2F%2Fcannettes.vercel.app%2F&response_type=code",
    // code: '...',
    scope: "public",
  });

  //Post request working with postman :
  // https://api.intra.42.fr/oauth/token?client_id=f5b5d42fac237f01e60e8141cfb7cad56c8a99d5a4128356f1846978f3ad7383&client_secret=1707f43fe58bab0bb4c4413a61604804116c4b91a3e2513842412af72a4d14eb&grant_type=client_credentials

  //  https://api.intra.42.fr/oauth/authorize?client_id=f5b5d42fac237f01e60e8141cfb7cad56c8a99d5a4128356f1846978f3ad7383&redirect_uri=https%3A%2F%2Fcannettes.vercel.app%2F&response_type=code

  //https://stackoverflow.com/questions/55435471/how-to-convert-a-curl-command-to-an-axios-call-in-react-get-put-post
  //curl -X POST --data "grant_type=client_credentials&client_id=MY_AWESOME_UID&client_secret=MY_AWESOME_SECRET" https://api.intra.42.fr/oauth/token

  //const auth = getAuthorizationCode(); // => { "access_token": "...", "expires_in": 900, ... }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
