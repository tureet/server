import l from './common/logger';
import mongoose from 'mongoose';

const userName = 'root';
const password = 'root';
const uri = `mongodb+srv://${userName}:${password}@cluster0.pfyj1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = async (): Promise<void> => {
  try {
    mongoose.connection.on('connecting', () => l.info(`Connecting MongoDb Instance: ${uri}`));
    mongoose.connection.on('connected', () => l.info(`Connected MongoDb Instance: ${uri}`));
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (e) {
    l.error(`Error connecting database ${e}`);
  }
};

export default connect;
