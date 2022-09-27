import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
export async function getServerSideProps({ query }) {

  const allPostsData = getSortedPostsData(query.id);
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }) {
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section> */}
       {/* Add this <section> tag below the existing <section> tag */}
       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, content }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`?id=${id}`}>
              {title}
              </Link>
              <br />
              {date}
              <br />
              {(allPostsData.length) == 1? content:""}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}