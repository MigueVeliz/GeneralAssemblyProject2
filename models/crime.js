const db = require('../db/config');

const axios = require('axios');

// if something does not work
//!!!!!!Check quotes in finAllByUSer
// and insertCrime !!!!!!!!!!!!!!!!


const findAllByUser = (userId) => {
	return db.any('SELECT * FROM crimes WHERE user_id = $1', [userId]);
}//end of findAllByUser

const findSingleCrime = (crimeId, userId) => {
	return db.oneOrNone('SELECT * FROM crimes WHERE id = $1 AND user_id = $2;',
		[crimeId, userId]);
}//end of findSingleCrime

const insertCrime = (crime, userId) => {
	return db.one(`INSERT INTO crimes
		(case_number, offense, place_of_occurrance, borough, user_id)
		VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		[crime.case_number, crime.offense, crime.place_of_occurrance, crime.borough, userId]);
}//end of insertCrime

const update = ( crime, crimeId, userId ) => {
	return db.oneOrNone(`UPDATE crimes
		SET case_number = $1, offense = $2, place_of_occurrance =$3, borough = $4
		WHERE id = $5 AND user_id = $6 RETURNING id`,
		[crime.case_number, crime.offense, crime.place_of_occurrance, crime.borough, crimeId, userId]);
}//end of update

const destroy = (crimeId, userId) => {
    return db.none(`DELETE FROM crimes WHERE id = $1 AND user_id = $2`,
        [crimeId, userId]);
}//end of destroy


//dont forget to export funtioncs!!!!
module.exports = { findAllByUser, findSingleCrime, insertCrime, destroy, update }


/*Name: Crime Data NYC
Description: Shows all crimes in NYC
App Token: vqGjPSfZZQBJGkHf1gi5Gr6zK
Secret Token: h9PCXhjUm7hGzM2khDxxd8cDVV6v0GYVpJPh*/



/*FRIENDLY NAME
Crime app
SID
SKc4dab82f92b21cdcc375cde63f8a80db
SECRET
RaAT3gYT3iU3l3YCJkyjY346UgEkPE9i*/


