import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails
} from "use-places-autocomplete";

export default function SearchInput(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        props.setLat(lat)
        props.setLong(lng)
      })
      .catch((error) => {
        console.log("😭 Error: ", error);
      });
    
    let placeId = ''

    getGeocode({ address: description })
      .then(results => placeId = results[0].place_id)
      .then(params => {
        params = {
          placeId: placeId,
          fields: ['utc_offset_minutes']
        }
        getDetails(params)
          .then((detail) => {
            props.setTzone(detail.utc_offset_minutes / 60)
          })
      })
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li style={{listStyle: 'none'}} key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <label htmlFor="place">Birth Place</label>
      <input
        onChange={handleChange}
        placeholder="Oakland, CA, US"
        value={value}
        className="input"
        required
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </>
  );
};