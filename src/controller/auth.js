const { user } = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    let userData = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt, updatedAt"],
      },
    });

    if (!userData) {
      return res.status(400).send({
        status: "Failed",
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userData.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: userData.id,
        role: userData.role,
      },
      process.env.TOKEN_KEY
    );

    userData = JSON.parse(JSON.stringify(userData));

    const avatar = userData.avatar
      ? process.env.PATH_AVATAR_IMAGES + userData.avatar
      : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

    const newUserData = {
      id: userData.id,
      email: userData.email,
      fullname: userData.fullname,
      gender: userData.gender,
      phone: userData.phone,
      address: userData.address,
      avatar: avatar,
      token,
    };

    res.send({
      status: "Success",
      message: "Login Successful",
      data: newUserData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
