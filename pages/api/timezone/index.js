// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res, err) {
  const url = process.env.TIMEZONE_API_URL
  console.log(req.body)
  if (req.method === 'POST') {
    const response = await axios.post(url, {
      latitude: req.body.lat,
      longitude: req.body.lon,
      date: req.body.date
  }, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.USER_ID}:${process.env.API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      res.status(200).json(response.data)
    }
  }
}