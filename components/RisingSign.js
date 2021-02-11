export default function RisingSign({ data }) {
  data.rising_sign = data.rising_sign.substring(2, data.rising_sign.length - 2);

  return (
    <>
      <h1>{data.rising_sign}</h1>
    </>
  )
}