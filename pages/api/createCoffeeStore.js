const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
)
const table = base('coffee-stores')
// console.log({ table })

const createCoffeeStore = async (req, res) => {
  console.log('[API-GET] : createCoffeeStore.js')
  // console.log({ req })

  if (req.method === 'POST') {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body

    //find a record
    try {
      const findCoffeeStoreRecords = await table
        .select({
          // filterByFormula: `id="5532adea498ef7e2678e5b09"`,
          // filterByFormula: `id="999"`,
          filterByFormula: `id=${id}`,
        })
        .firstPage()

      // console.log({ findCoffeeStoreRecords })

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          }
        })
        res.json(records)
      } else {
        //create a record
        const createRecords = await table.create([
          {
            fields: {
              // id: '999',
              // name: 'My favourite Coffee Store',
              // address: 'my address',
              // neighbourhood: 'some neighbourhood',
              // voting: 200,
              // imgUrl: 'http://myimage.com',
              id,
              name,
              address,
              neighbourhood,
              voting,
              imgUrl,
            },
          },
        ])

        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          }
        })
        res.status(201)
        res.json(records)
      }
    } catch (err) {
      console.error('Error finding store', err)
      res.status(500)
      res.json({ message: 'Error finding store', err })
    }
  }
}

export default createCoffeeStore
