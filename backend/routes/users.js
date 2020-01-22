const router = require('express').Router();
let usersModule = require ('../modules/usersModule')

router.get('/list', async(req, res, next) => {
    var userMap = {}
    userMap = await usersModule.getUsersList({})
    res.json(userMap);  
  }
)

router.post('/register', async (req, res, next) => {
    let checkIfUsernameExists = await usersModule.checkIfExists(req.body.username)

    if (!checkIfUsernameExists) {
      let registerRes = await usersModule.register(req.body)
      res.json({ isUsernameFree: true,  
                 username : registerRes.username, 
                 isAdmin : registerRes.isAdmin, 
                 _id: registerRes._id })
    } else {
      res.json({ isUsernameFree: false })
    }
  }) 


  router.post('/login', async (req, res, next) => {

    let loginRes = await usersModule.login(req.body)
    if (loginRes.length !== 0) {
      res.json({isUser: true, 
                username:loginRes[0].username, 
                isAdmin : loginRes[0].isAdmin, 
                _id: loginRes[0]._id })
    } else {
      res.json({isUser: false})
    }
  })
  

  router.get('/:userId/keyword', async (req, res, next) => {   
    let loginRes = await usersModule.findUser(req.params.userId)
    if (loginRes.length !== 0) {
      res.json({username : loginRes.username, 
                keywords : loginRes.searchedKeywords })
    } else {
      res.json()
    }
  })

  router.post('/:userId/keyword', async (req, res, next) => {
    let loginRes = await usersModule.findUser(req.params.userId)
    
    if (loginRes.length !== 0) {
      loginRes.searchedKeywords.push({keyword: req.body.userInput})

      await usersModule.addKeyword(loginRes)
      res.json({username : loginRes.username, 
                keywords : loginRes.searchedKeywords })
    } else {
      res.json({isUser: false})
    }
  })

  router.get('/:userId/watchedVideos', async (req, res, next) => {
    
    let findUserRes = await usersModule.findUser(req.params.userId)
    if (findUserRes.length !== 0) {
      res.json({username : findUserRes.username, 
                watchedVideos : findUserRes.watchedVideos })
    } else {
      res.json()
    }
  })

  
  router.post('/:userId/watchedVideos', async (req, res, next) => {
    let findUserRes = await usersModule.findUser(req.params.userId)    
    if (findUserRes.length !== 0) {
      findUserRes.watchedVideos.push({videoName : req.body.videoName, 
                                      duration : req.body.duration})

      await usersModule.addWatchedVideo(findUserRes)
      res.json({username : findUserRes.username, 
                watchedVideos : findUserRes.watchedVideos })
    } else {
      res.json()
    }
  })
  
  router.get('/:userId/usersdata', async (req, res, next) => {
    
    let findUserRes = await usersModule.findUser(req.params.userId)
    if (findUserRes.length !== 0) {
      res.json({username : findUserRes.username, 
                watchedVideos : findUserRes.watchedVideos, 
                keywords : findUserRes.searchedKeywords })
    } else {
      res.json()
    }
  })

module.exports= router;