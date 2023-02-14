import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import coffeeStoresData from '../../data/coffee-stores.json'

// SERVER-SIDE
export async function getStaticProps(staticProps) {
  const params = staticProps.params
  console.log('params', params)
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id //dynamic id
      }),
    },
  }
}

// SERVER-SIDE
export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      //  { params: { id: '0' } }
      params: {
        id: coffeeStore.id.toString(),
      },
    }
  })
  return {
    // paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    paths,
    fallback: true,
    // [fallback: boolean] Does route exist in getStaticPaths? [YES/NO]
    // - [false] YES -> pre-render, NO -> 404
    // - [true] YES -> pre-render, NO -> download (loading) & pre-render OR error
    //   - check router.isFallback before render
  }
}

// CLIENT-SIDE
const CoffeeStore = (props) => {
  const router = useRouter()
  console.log('router', router)

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { id, name, address, neighbourhood, websiteUrl, imgUrl } =
    props.coffeeStore

  console.log('props', props)
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href='/' legacyBehavior>
        <a>Back to home</a>
      </Link>
      <hr />
      Coffee Store Page (query.id: <b>{router.query.id}</b>)
      <hr />
      <p>
        id: <b>{id}</b>
      </p>
      <p>
        name: <b>{name}</b>
      </p>
      <p>
        address: <b>{address}</b>
      </p>
      <p>
        neighbourhood: <b>{neighbourhood}</b>
      </p>
      <p>
        websiteUrl: <b>{websiteUrl}</b>
      </p>
      <p>
        imgUrl: <b>{imgUrl}</b>
      </p>
    </div>
  )
}

export default CoffeeStore

// import { useRouter } from 'next/router'
// import Link from 'next/link'

// const CoffeeStore = () => {
//   const router = useRouter()
//   console.log('router', router)
//   return (
//     <div>
//       <Link href='/' legacyBehavior scroll={true}>
//         <a>Back to home</a>
//       </Link>
//       <br />
//       <Link href='/coffee-store/dynamic' legacyBehavior>
//         <a>Go to page dynamic</a>
//       </Link>
//       <br />
//       <Link href='https://www.google.com/'>Google.com</Link>
//       <hr />
//       Coffee Store Page <b>{router.query.id}</b>
//     </div>
//   )
// }

// export default CoffeeStore
