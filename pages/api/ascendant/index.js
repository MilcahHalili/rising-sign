// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res, err) {
  const url = process.env.API_URL
  
  if (req.method === 'POST') {
    console.log(req.body, ' req.body in api/ascendant')
    const response = await axios.post(url, req.body, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.USER_ID}:${process.env.API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      res.status(200).json(response.data)
    } else {
      console.log(err)
    }
  }
}