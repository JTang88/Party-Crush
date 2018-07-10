import mongoose from 'mongoose';

const uri = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
});

mongoose.connection.on('error', (error) => {
  console.log('Mongoose default connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

const db = mongoose.connection;

export default db;