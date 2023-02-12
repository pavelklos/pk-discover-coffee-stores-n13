import { useRouter } from 'next/router'
import Link from 'next/link'

const CoffeeStore = () => {
  const router = useRouter()
  console.log('router', router)
  return (
    <div>
      <Link href='/' legacyBehavior scroll={true}>
        <a>Back to home</a>
      </Link>
      <br />
      <Link href='https://www.google.com/'>Google.com</Link>
      <hr />
      Coffee Store Page <b>{router.query.id}</b>
    </div>
  )
}

export default CoffeeStore
