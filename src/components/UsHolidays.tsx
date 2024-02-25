import React, { useEffect, useState } from 'react'
import { apiLink } from '../api_links';
import styled from 'styled-components';

interface apiProps{
  name:string;
  date:string;
  countryCode:string;
}

const UsHolidays = () => {
  const [apiData, setApiData] = useState<apiProps[]>();

  useEffect(() => {
    fetchDataApi();
  },[1000]);

  //FETCH API use async await
  const fetchDataApi = async () => {
    try {
      const response = await fetch(apiLink);
      const data = await response.json();
      console.log(data);
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    }

    return (
      <HolidaysWrapper>
        {apiData && apiData.length > 0 && (
          <h2>Public Holidays {apiData[0].countryCode}</h2>
        )}
      </HolidaysWrapper>
    );
  };
};
export default UsHolidays;

const HolidaysWrapper = styled.div``;