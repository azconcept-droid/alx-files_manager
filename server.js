import express from 'express';
import router from './routes';

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
