// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('[API-GET] : hello.js')
  const now = new Date()
  // console.log({ req, res, now })
  res.status(200).json({ name: 'John Doe', now: now.toLocaleString() })
}
