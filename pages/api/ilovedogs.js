// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('[API-GET] : ilovedogs.js')
  const query = req.query.breed
  // console.log({ req, res, query })
  res.status(200).json({ message: `I love ${query}` })
}
