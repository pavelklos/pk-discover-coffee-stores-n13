import { fetchCoffeeStores } from '../../lib/coffee-stores'

// [GET] /api/getCoffeeStoreByLocation?latLong=50,14&limit=3
const getCoffeeStoresByLocation = async (req, res) => {
  console.log('[API-GET] : getCoffeeStoreByLocation.js', { query: req.query })
  try {
    const { latLong, limit } = req.query
    const response = await fetchCoffeeStores(latLong, limit)
    res.status(200)
    res.json(response)
  } catch (err) {
    console.error('There is an error', err)
    res.status(500)
    res.json({ message: 'Oh no! Something went wrong', err })
  }

  //return
}

export default getCoffeeStoresByLocation
