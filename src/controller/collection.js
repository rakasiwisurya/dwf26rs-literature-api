const { user, literature, collection } = require("../../models");

exports.getMyCollections = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await collection.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: literature,
          as: "literature",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "literatureId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      literature: {
        ...item.literature,
        attache: process.env.PATH_LITERATURE_FILES + item.literature.attache,
      },
      user: {
        ...item.user,
        avatar: process.env.PATH_AVATAR_IMAGES + item.user.avatar,
      },
    }));

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
