//initialize unsplash

import { createApi } from 'unsplash-js'

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  })
  const unsplashResults = photos.response.results
  return unsplashResults.map((result) => result.urls['small'])
}

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos()
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  }

  const response = await fetch(
    // getUrlForCoffeeStores('50.13530804882977,14.100613497437408', 'coffee', 6),
    getUrlForCoffeeStores('50.1415936,14.1131776', 'coffee', 6),
    options
  )
  const data = await response.json()
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : '',
      imgUrl: photos[idx],
    }
  })
}
