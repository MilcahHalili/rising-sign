export default function RisingSign(props) {
  return (
    <>
      <h1>{props.ascendant} Rising</h1>
      <p
        style={{
          width: '50%',
          color: '#323232'
        }}
      >{props.report}</p>
    </>
  )
}