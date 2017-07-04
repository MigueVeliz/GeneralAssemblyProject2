const router = require('express').Router();
const Crimes = require('../models/crime');

const crimesArr = {};




//testind this route to get email
// previos route on top works

router.get('/', (req,res) => {
	Crimes
		.findAllByUser(req.user.id)
		.then(crimes => {
			res.render('crimes/index', {
				crimes: crimes,
				email: req.user.email
			})
		})
		.catch( err => {
			console.log(error);
		})
})



// router.get('/', (req,res) => {
// 	res.render('index')
// })

//renders main page 
//to look for crimes
router.get('/new', (req, res) => {
	
	res.render('crimes/new')

});//end of router



router.get('/:id/edit', (req,res)=>{
    Crimes
    .findSingleCrime(req.params.id, req.user.id)
    .then( crime => {
        res.render('crimes/edit', crime );
    })
    .catch(err => console.log('error from edit ', err));
});

//redirects to crimes/crime when the
//user clicks on a button on a single crime
router.get('/:id', (req,res) => {
	Crimes
		.findSingleCrime(req.params.id, req.user.id)
		.then( crime => {
			res.render('crimes/crime', crime);
		})
		.catch( err => console.log( err ));

});



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
});

//Edit information
router.put('/:id', (req,res) => {
	Crimes
		.update(req.body, req.params.id, req.user.id)
		.then( crime => {
			console.log("Then", crime);
			res.json(crime);
		})
		.catch( err => console.log( err ))
});

router.delete('/:id', (req,res) => {
	Crimes
		.destroy(req.params.id, req.user.id)
		.then(crime => {
			res.send('deleted')
		})
		.catch(err => console.log(err))
});



module.exports = router;