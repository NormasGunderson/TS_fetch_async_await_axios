import React, { useEffect, useState } from "react";
import { apiLink } from "../api_links";
import { HolidaysWrapper } from "./HolidaysWrapper";
// import axios from "axios";
// import { error } from "console";

interface apiProps {
  name: string;
  date: string;
  countryCode: string;
}

const UsHolidays: React.FC = () => {
  const [apiData, setApiData] = useState<apiProps[]>();

  useEffect(() => {
    fetchDataApi();
  }, []);

  //!FETCH API use async await
  // const fetchDataApi = async () => {
  //   try {
  //     const response = await fetch(apiLink);
  //     const data = await response.json();
  //     setApiData(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log("Something went wrong, please try again", error);
  //   }
  // };

  //! fetching the api data using the AXIOS, this is synchronized
  // const fetchDataApi = () => {
  //   axios.get(apiLink)
  //   .then((response) => {
  //     const fetchData = response.data;
  //     setApiData(fetchData);
  //   })
  //   .catch((error) => {
  //     console.error('Something went wrong, please try again later', error)
  //   })
  // }

  //! fetching the api data using the PROMISES

  const fetchDataApi = () => {
    fetch(apiLink)
    .then((response) => {
      if (!response.ok) {
        throw new Error ("No Response from the server");
      }
      return response.json();
    })
    .then((fetchedData) => {
      setApiData(fetchedData);
    })
    .catch((error) => {
      console.error('No data found')
    })
  }

  //!function to change the date format
  function changeDateFormat(dateString: string | number | Date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-UK", options);
  }
  return (
    <HolidaysWrapper>
      {apiData && apiData.length > 0 && (
        <h1>Public Holidays {apiData[0].countryCode}</h1>
      )}

      <table>
        <thead>
          <tr>
            <th>Holiday Type</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {apiData &&
            apiData.map((info, index) => (
              <tr key={index}>
                <td>{info.name}</td>
                <td>{changeDateFormat(info.date)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </HolidaysWrapper>
  );
};

export default UsHolidays;
