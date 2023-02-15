import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import cls from 'classnames'

import coffeeStoresData from '../../data/coffee-stores.json'

import styles from '../../styles/coffee-store.module.css'

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
  // console.log('router', router)

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { id, name, address, neighbourhood, websiteUrl, imgUrl } =
    props.coffeeStore

  const handleUpvoteButton = () => {
    console.log('handle upvote')
  }

  // console.log('props', props)
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/' legacyBehavior>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/places.svg' width='24' height='24' />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/nearMe.svg' width='24' height='24' />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width='24' height='24' />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
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
