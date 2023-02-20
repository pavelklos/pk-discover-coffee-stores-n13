import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import cls from 'classnames'

// import coffeeStoresData from '../../data/coffee-stores.json'
import styles from '../../styles/coffee-store.module.css'
import { fetchCoffeeStores } from '../../lib/coffee-stores'

import { StoreContext } from '../../store/store-context'

import { fetcher, isEmpty } from '../../utils'

export async function getStaticProps(staticProps) {
  console.log('[SSG] : [id].js : getStaticProps()')
  const params = staticProps.params
  // console.log('params', params)

  const coffeeStores = await fetchCoffeeStores()
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id //dynamic id
  })

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  }
}

export async function getStaticPaths() {
  console.log('[SSG] : [id].js : getStaticPaths()')
  const coffeeStores = await fetchCoffeeStores()
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    }
  })
  return {
    paths,
    fallback: true,
  }
}

const CoffeeStore = (initialProps) => {
  // console.log('props', props)

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const id = router.query.id

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)

  const {
    state: { coffeeStores },
  } = useContext(StoreContext)

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, imgUrl, neighbourhood, address } = coffeeStore
      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighbourhood: neighbourhood || '',
          address: address || '',
        }),
      })

      const dbCoffeeStore = await response.json()
      console.log({ dbCoffeeStore })
    } catch (err) {
      console.error('Error creating coffee store', err)
    }
  }

  useEffect(() => {
    console.log('[CSR] : [id].js : useEffect()', { id })
    console.log('[CSR] : [id].js : useEffect()', { initialProps })
    console.log('[CSR] : [id].js : useEffect()', { coffeeStores })
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        // CSR
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id //dynamic id
        })
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext)
          handleCreateCoffeeStore(coffeeStoreFromContext)
        }
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore)
    }
  }, [id, initialProps, initialProps.coffeeStore])

  const { name, address, neighbourhood, imgUrl } = coffeeStore

  const [votingCount, setVotingCount] = useState(1)

  // const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`)
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

  useEffect(() => {
    if (data && data.length > 0) {
      console.log('data from SWR', data)
      setCoffeeStore(data[0])
      setVotingCount(data[0].voting)
    }
  }, [data])

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch('/api/favouriteCoffeeStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

      const dbCoffeeStore = await response.json()

      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = votingCount + 1
        setVotingCount(count)
      }
    } catch (err) {
      console.error('Error upvoting the coffee store', err)
    }
  }

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>
  }

  // console.log({ coffeeStore })

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/' legacyBehavior>
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src='/static/icons/places.svg' width='24' height='24' />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image src='/static/icons/nearMe.svg' width='24' height='24' />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width='24' height='24' />
            <p className={styles.text}>{votingCount}</p>
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
