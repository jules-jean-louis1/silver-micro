const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("silver_micro", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

export default sequelize;
