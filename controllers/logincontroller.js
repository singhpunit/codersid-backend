const jwt = require('jsonwebtoken')
const User = require('../models/usermodal');

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ msg: "Please enter email and password" })
    }
    else if (email === "admin@test.com" && password === "admin1234") {
      const id = new Date().getDate()
            const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
              expiresIn: '30d',
            })
      res.status(200).json({ msg: "Admin login successfully", role: "admin", token })
    }
    else {

      User.find({ email: req.body.email }).exec()
        .then(user => {
          if (user.length < 1) {
            res.status(401).json({ msg: "User not exists " })
          }
          else if (user[0].password !== req.body.password) {
            res.status(401).json({ msg: "Password does not match" })
          }
          else {
            const id = new Date().getDate()
            const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
              expiresIn: '30d',
            })

            res.status(200).json({ msg: "User login successfully", user: user, token, role: "user" })
          }
        })


    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "User not found" })
  }

}



module.exports = {
  login
}