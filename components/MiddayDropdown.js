export default function MiddayDropdown(props) {
  const handleSelect = e => {
    props.setMidday(e.target.value)
  }
  return (
    <>
      <label htmlFor="midday">AM or PM</label>
      <select
        name="midday"
        className="dropdown"
        onChange={handleSelect}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </>
  )
}