import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import DataOperations from '../components/DataOperations'
import { useRouter } from 'next/router'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//   await sleep(300)
//   window.alert(JSON.stringify(values, 0, 2))
// }
interface Props {
  setuser: Function,
  user: {
    uid: string,
    email: string
  }
}
const Home: NextPage<Props> = (props) => {
  const router = useRouter()
console.log('index');

  useEffect(() => {
   
    if (!props.user.uid) {
      router.push('/Login')
    }
  }, [])

  if (props.user.uid){
    return (
      <div>
        <Head>
          <title>File uploader</title>
          <meta name="description" content="File uploader" />
        </Head>
      
        <main className="py-10">
          <div className="w-full max-w-3xl px-3 mx-auto">
            <DataOperations user={props.user}></DataOperations>
          </div>
        </main>

        <footer>
          <div className="w-full max-w-3xl px-3 mx-auto">
            <p>All right reserved</p>
          </div>
        </footer>
      </div>
    );
  }else{
    return <div>go to login page</div>
  }
};
export default Home;