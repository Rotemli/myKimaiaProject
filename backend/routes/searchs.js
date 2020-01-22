const router = require('express').Router();
let Search = require('../models/searches.model');


router.post('/:username/keyword', async (req, res, next) => {

    let loginRes = await usersModule.login(req.body)
    console.log("login res ", loginRes)
  
    if (loginRes.length !== 0) {
    
    //   req.session.user = {
    //     userId: loginRes[0]._id,
    //     username: loginRes[0].username,
    //     password: loginRes[0].password
    //   }
    //   console.log("session", req.session.user)
    console.log("is Admin -> " + loginRes[0].isAdmin)
      res.json({isUser: true, username:loginRes[0].username, isAdmin : loginRes[0].isAdmin })
    } else {
      res.json({isUser: false})
    }
  })






router.route('/').get((req, res) => {
    Search.find()
    .then(searchs => res.json(searchs))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const term = req.body.term;
    const duration= Number(req.body.duration);
    const date= Date.parse(req.body.date)
    
    const newSearch = new Search({
    username, term, duration, date});
    newSearch.save()
    .then(() => res.json('search added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Search.findById(req.params.id)
      .then(search => res.json(search))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
//   router.route('/:id').delete((req, res) => {
//     Search.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Search deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
//   router.route('/update/:id').post((req, res) => {
//     Search.findById(req.params.id)
//       .then(search => {
//         search.username = req.body.username;
//         search.term = req.body.term;
//         search.duration = Number(req.body.duration);
//         search.date = Date.parse(req.body.date);
  
//         search.save()
//           .then(() => res.json('search updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });






module.exports= router;