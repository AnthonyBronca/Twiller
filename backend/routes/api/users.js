const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Location, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

//sign up middle-ware
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('fullname')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];




  router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, fullname, password, username } = req.body;
      console.log(fullname, "this is fullName")
      console.log(email, "this is email")
      console.log(username, "this is is username")
      const user = await User.signup({ email, username, fullname, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

module.exports = router;
