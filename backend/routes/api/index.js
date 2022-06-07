const router = require('express').Router();
// const sessionRouter = require('./session.js');
// // const usersRouter = require('./users.js');
// // const bookingRouter = require('./bookings')


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


// router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// // router.use('/bookings', bookingRouter)


router.get('/api/csrf/restore', (req,res)=>{
    if (process.env.NODE_ENV !== 'production') {
        router.get('/api/csrf/restore', (req, res) => {
          res.cookie('XSRF-TOKEN', req.csrfToken());
          return res.json({});
        });
      }
})




module.exports = router;
