export default function RisingSign(props) {
  return (
    <>
      <h2 style={{fontSize: 40}}>{props.ascendant} Rising</h2>
      <p
        style={{
          width: '50%',
          color: '#323232',
          marginBottom: 77
        }}
      >
        {props.report}
      </p>
    </>
  )
}