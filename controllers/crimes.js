const router = require('express').Router();
const Crimes = require('../models/crime');

const crimesArr = {};


router.get('/', (req,res) => {
	res.render('index')
})

router.get('/crimes/index', (req, res) => {
	Crimes
		.allCrimes()
		.then( crimes => {
			//res.json(crimes);
/*
			crimesArr.offenseDescription = crimes.data[1].ofns_desc;
			crimesArr.boroughName = crimes.data.boto_nm;
			crimesArr.ky_cd = crimes.data.ky_cd;
			crimesArr.addressPrecint_cd = crimes.data.addr_pct_cd;
			crimesArr.locationOfOccurance = crimes.data.loc_of_occur_desc;

			const arr = crimes.data[1];

			res.send(arr);
			console.log(arr)*/

			res.render('crimes/new', crimes)
		})
		.catch( err => { console.log(err) });
});//end of router.getnew


module.exports = router;