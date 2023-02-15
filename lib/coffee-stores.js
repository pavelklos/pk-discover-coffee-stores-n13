// initialize unsplash

import { createApi } from 'unsplash-js'

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  // ...other fetch options
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  }

  const response = await fetch(
    getUrlForCoffeeStores(
      // '43.653833032607096,-79.37896808855945',
      '50.13530804882977,14.100613497437408',
      'coffee',
      6
    ),
    options
  )
  const data = await response.json()
  return data.results
}
