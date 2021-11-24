const { user, literature, collection } = require("../../models");

exports.getMyCollections = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await literature.findAll({
      where: {
        userId: id,
      },
      include: {
        model: user,
        as: "userCollection",
        through: {
          model: collection,
          as: "bridge",
          attributes: [],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error",
    });
  }
};
