import l from './common/logger';
import mongoose from 'mongoose';

const userName = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const databaseName = process.env.MONGODB_DBNAME;
const hostedUrl = process.env.MONGODB_HOSTED_URL;

const mongoUri = `mongodb://${userName}:${password}@${hostedUrl}/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=${databaseName}`;

const connectDb = async (): Promise<void> => {
  try {
    mongoose.connection.on('connecting', () => l.info(`Connecting MongoDb Instance: ${mongoUri}`));
    mongoose.connection.on('connected', () => l.info(`Connected MongoDb Instance: ${mongoUri}`));
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (e) {
    l.error(`Error connecting database ${e}`);
  }
};

export default connectDb;
