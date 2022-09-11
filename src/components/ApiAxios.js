import React, { useState } from 'react';
import axios from 'axios';


const fetchDataCall = async ({ }) => {
  let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://frengly.com/ai/notesSec', {'authKey': key})
    .then(async function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

export default fetchDataCall