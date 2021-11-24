const { user } = require("../../models");

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const avatar = data.avatar
      ? process.env.PATH_AVATAR_IMAGES + data.avatar
      : null;

    const newData = {
      ...data,
      avatar: avatar,
    };

    res.send({
      status: "Success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error",
    });
  }
};
