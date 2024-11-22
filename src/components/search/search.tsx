import React, { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

// Define types for the component props
interface SearchProps {
  onSearchChange: (searchData: SearchData | null) => void;
}

interface SearchData {
  value: string;
  label: string;
}

interface CityData {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

// Define the shape of options returned by loadOptions
interface LoadOptionsResult {
  options: SearchData[];
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<SearchData | null>(null);

  const loadOptions: LoadOptions<SearchData, LoadOptionsResult> = async (
    inputValue: string
  ) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const responseData = await response.json();

      if (responseData.data && Array.isArray(responseData.data)) {
        const options = responseData.data.map((city: CityData) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));

        return { options };
      } else {
        return { options: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData: SearchData | null) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
