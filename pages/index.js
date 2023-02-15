import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'

import coffeeStoresData from '../data/coffee-stores.json'

// SERVER-SIDE
export async function getStaticProps(context) {
  // console.log('hi getStaticProps')

  // Foursquare : Place Search *************************************************
  // https://location.foursquare.com/developer/reference/place-search
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: '<add your foursquare token here>',
    },
  }
  fetch(
    'https://api.foursquare.com/v3/places/search?query=coffee&ll=50.13530804882977%2C14.100613497437408&limit=6',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log('[API : Foursquare - Place Search]')
      console.log(response)
    })
    .catch((err) => console.error(err))
  // Foursquare : Place Search *************************************************

  return {
    props: {
      coffeeStores: coffeeStoresData,
    }, // will be passed to the page component as props
  }
}

// CLIENT-SIDE
export default function Home(props) {
  // console.log('props', props)

  const handleOnBannerBtnClick = () => {
    console.log('hi banner button')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   // console.log('styles', styles)
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name='description' content='Generated by create next app' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href='https://nextjs.org'>Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href='https://nextjs.org/docs' className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href='https://nextjs.org/learn' className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href='https://github.com/vercel/next.js/tree/canary/examples'
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//             target='_blank'
//             rel='noopener noreferrer'
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }
