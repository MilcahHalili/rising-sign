export default function RisingSign(props) {
  return (
    <>
      <h2 style={{fontSize: 40}}>{props.ascendantSign} Rising</h2>
      <p>{props.ascendantSummary}</p>
      <p>{props.ascendantRuler}</p>
      <style jsx>{`
        p {
          width: 50%;
          color: #323232;
          marginBottom: 77px;
        }
        @media (max-width: 812px) {
          h2 {
            font-size: 35px;
          }
          p {
            width: 95%;
          }
        }
      `}</style>
    </>
  )
}