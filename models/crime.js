const db = require('../db/config');

const axios = require('axios');



function allCrimes() {
    const ky_cd = '104',
        boroName = 'MANHATTAN',
        location = 'INSIDE',
        offenseDesc = 'RAPE',
        address = '20';

    const queryPromise = axios({
        //url: 'https://data.cityofnewyork.us/resource/9s4h-37hy.json?ky_cd=104&boro_nm=MANHATTAN&loc_of_occur_desc=INSIDE&ofns_desc=RAPE&addr_pct_cd=20',
        url: `https://data.cityofnewyork.us/resource/9s4h-37hy.json?ky_cd=${ky_cd}&boro_nm=${boroName}&loc_of_occur_desc=${location}&ofns_desc=${offenseDesc}&addr_pct_cd=${address}`,
        method: 'GET',
        data: {
            '$limit': 2,
            '$$app_token': 'vqGjPSfZZQBJGkHf1gi5Gr6zK'
        }
    });

    return queryPromise;
}


function customCrime() {
    const queryPromise = axios({
        url: '',
        method: 'GET'
    });
}

//dont forget to export funtioncs!!!!
module.exports = { allCrimes, customCrime }


/*Name: Crime Data NYC
Description: Shows all crimes in NYC
App Token: vqGjPSfZZQBJGkHf1gi5Gr6zK
Secret Token: h9PCXhjUm7hGzM2khDxxd8cDVV6v0GYVpJPh*/
