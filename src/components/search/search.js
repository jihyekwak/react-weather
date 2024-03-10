import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    // const loadOptions = (inputValue) => {
    //     return fetch(
    //         `${GEO_API_URL}&namePrefix=${inputValue}`, geoApiOptions
    //     )
    //         .then((response) => response.json())
    //         .then((response) => {
    //             return {
    //                 options: response.data.map((city) => {
    //                     return {
    //                         value: `${city.latitude} ${city.longitude}`,
    //                         label: `${city.name}, ${city.countryCode}`,
    //                     };
    //                 }),
    //             };
    //         })
    //         .catch((err) => console.log(err))
    // }

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}&namePrefix=${inputValue}`, geoApiOptions);
            const result = await response.json();
            return {
                options: result.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            }
        } catch (error) {
            console.error(error);
        }
    }




    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;