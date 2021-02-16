import axios from 'axios'

export default async function handler(req, res, err) {
  const url = process.env.CUSTOM_API_URL

  if (req.method === 'POST') {
    const response = await axios.post(url, {
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: req.body.tzone,
      house_type: "whole_sign",
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      min: req.body.min,
      hour: req.body.hour
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