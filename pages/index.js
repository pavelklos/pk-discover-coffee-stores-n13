import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'

import coffeeStoresData from '../data/coffee-stores.json'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import { ACTION_TYPES, StoreContext } from '../store/store-context'

export async function getStaticProps(context) {
  console.log('[SSG] : index.js : getStaticProps()')

  const coffeeStores = await fetchCoffeeStores()

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  }
}

export default function Home(props) {
  // console.log('props', props)

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation()

  // const [coffeeStores, setCoffeeStores] = useState('')
  const [coffeeStoresError, setCoffeeStoresError] = useState(null)

  const { dispatch, state } = useContext(StoreContext)
  // console.log('REDUCER:', state)

  const { coffeeStores, latLong } = state

  // console.log({ latLong, locationErrorMsg })

  useEffect(() => {
    console.log('[CSR] : index.js : useEffect()', { latLong })
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          // [lib]
          // const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30)
          // console.log('[CSR] : index.js : useEffect()', {
          //   fetchedCoffeeStores,
          // })
          // [api]
          const response = await fetch(
            `/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=30`
          )
          const apiCoffeeStores = await response.json()
          console.log('[CSR] : index.js : useEffect()', {
            apiCoffeeStores,
          })
          // setCoffeeStores(fetchedCoffeeStores)
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              // coffeeStores: fetchedCoffeeStores,
              coffeeStores: apiCoffeeStores,
            },
          })
          setCoffeeStoresError('')
          //set coffee stores
        } catch (error) {
          //set error
          console.error({ error })
          setCoffeeStoresError(error.message)
        }
      }
    }
    setCoffeeStoresByLocation()
  }, [dispatch, latLong])

  const handleOnBannerBtnClick = () => {
    // console.log('hi banner button')
    handleTrackLocation()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name='description'
          content='allows you to discover coffee stores'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}

        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='hero image'
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>
              Stores near me <small>[{coffeeStores.length}]</small>
              <br />
              <small style={{ fontSize: '0.75em' }}>location: {latLong}</small>
            </h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </div>
        )}

        <div className={styles.sectionWrapper}>
          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
