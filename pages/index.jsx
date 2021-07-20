import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import Nav from "../components/nav";
import Main from "../components/main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Duck Fed</title>
        <link rel="icon" href="/duck.ico" />
      </Head>
      <CssBaseline />
      <Nav />
      <Main />
    </>
  );
}
