import './config.dotenv'; // sort-imports-ignore

import { translationService } from '../lib/lambdas/translate/translate.services';
import { createLambdaEvent } from '../utils/utils.express';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const localRoutes = () => {
  const router = express.Router();

  router.post('/translate/text', createLambdaEvent(translationService));
  return router;
};

const localApi = async () => {
  const app = express();
  const routes = localRoutes();
  const port = 3005;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      credentials: true,
      origin: (_: any, callback: any) => callback(null, true),
    }),
  );
  app.use(routes);
  app.listen(port, () => console.log('Running at: http://localhost:' + port));
};

localApi();
