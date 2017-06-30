const router = require('express').Router();
const Crimes = require('../models/crime');

const crimesArr = {};


router.get('/', (req,res) => {
	res.render('index')
})

//renders main page 
//to look for crimes
router.get('/index', (req, res) => {
	
	res.render('crimes/new')

});//end of router

//redirects to crimes/crime when the
//user clicks on a button on a single crime
router.get('/:id', (req,res) => {
	Crimes
		.findSingleCrime(req.params.id, req.user.id)
		.then( crime => {
			res.render('crimes/crime', crime);
		})
		.catch( err => console.log( err ));

});//





















//***************** API ROUTES ************************* 
/* 
* CREATE POST ROUTES HRE
*/
router.post('/', (req,res) => {
	console.log("reg.body: " + req.body)
	Crimes
		.insertCrime( req.body, req.user.id)
		.then( crime => {
			console.log("inside Ajax: " + crime);
			res.json({ crime });
		})
		.catch( err => console.log( err ));
})




module.exports = router;