const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("silver_micro", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
    throw error; // Relancer l'erreur pour la gérer plus loin
  }
}

export default sequelize;
