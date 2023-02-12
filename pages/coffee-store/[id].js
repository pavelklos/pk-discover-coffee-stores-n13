import { useRouter } from 'next/router'

const CoffeeStore = () => {
  const router = useRouter()
  console.log('router', router)
  return (
    <div>
      Coffee Store Page <b>{router.query.id}</b>
    </div>
  )
}

export default CoffeeStore
