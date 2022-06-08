const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// const bookingRouter = require('./bookings')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


router.get('/api/csrf/restore', (req,res)=>{
    if (process.env.NODE_ENV !== 'production') {
        router.get('/api/csrf/restore', (req, res) => {
          res.cookie('XSRF-TOKEN', req.csrfToken());
          return res.json({});
        });
      }
})

//website./locations/

//webite./music/:id



module.exports = router;
