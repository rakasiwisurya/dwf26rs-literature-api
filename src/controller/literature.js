const { literature, user } = require("../../models");

exports.getSearch = async (req, res) => {
  const titleQuery = req.query.title;
  const { Op } = require("sequelize");

  try {
    let data = await literature.findAll({
      where: {
        title: {
          [Op.substring]: titleQuery,
        },
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      publication_date: item.publication_date,
      pages: item.pages,
      isbn: item.isbn,
      author: item.author,
      attache: process.env.PATH_LITERATURE_FILES + item.attache,
      user: item.user,
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

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await literature.findAll({
      where: {
        userId: id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
