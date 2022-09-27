import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function FirstPost() {
    return (
      <Layout>
        <Head>
          <title>second Post</title>
        </Head>
        <h1>second Post</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    );
  }