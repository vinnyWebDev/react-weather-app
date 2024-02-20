import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              //our wetaher api needs latitude and longitude values to get weather, hence why we return these
              value: `${city.latitude} ${city.longitude}`,
              //the label is what the user will be able to see to indicate city name
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      //debounce is set to 600ms to reduce api calls somewhat
      debounceTimeout={600}
      value={search}
      //onchange call handleOnChange and pass in the entered value as parameter
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
