import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'silver_micro',
  username: 'root',
  password: '',
  host: 'localhost',
  models: [__dirname + '/models'], 
  dialectModule: require('mysql2'),
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
    throw error; 
  }
}

export default sequelize;
