const db = require('../db/config');

const axios = require('axios');

// if something does not work
//!!!!!!Check quotes in finAllByUSer
// and insertCrime !!!!!!!!!!!!!!!!


const findAllByUser = (userId) => {
	return db.any('SELECT * FROM shows WHERE user_id = $1', [user_id]);
}//end of findAllByUser

const findSingleCrime = (crimeId, userId) => {
	return db.oneOrNone('SELECT * FROM crimes WHERE id = $1 AND user_id = $2;',
		[crimeId, userId]);
}//end of findSingleCrime

const insertCrime = (crime, userId) => {
	return db.one(`INSERT INTO crimes
		(offense, place_of_occurrance, borough, user_id)
		VALUES ($1, $2, $3, $4) RETURNING *`,
		[crime.offense, crime.place_of_occurrance, crime.borough, userId]);
}//end of insertCrime



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
module.exports = { findAllByUser, findSingleCrime, insertCrime, allCrimes }


/*Name: Crime Data NYC
Description: Shows all crimes in NYC
App Token: vqGjPSfZZQBJGkHf1gi5Gr6zK
Secret Token: h9PCXhjUm7hGzM2khDxxd8cDVV6v0GYVpJPh*/
