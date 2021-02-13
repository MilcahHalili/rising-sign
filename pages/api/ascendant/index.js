// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
  const url = 'https://json.astrologyapi.com/v1/general_ascendant_report/tropical'
  
  if (req.method === 'POST') {
    console.log(req.body)
    const response = await axios.post(url, req.body, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.USER_ID}:${process.env.API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      console.log(response.data, ' 🙌🏽✨')
      res.status(200).json(response.data)
      return response.data
    }
  }
}