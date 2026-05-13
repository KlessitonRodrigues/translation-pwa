import { TranslateClient } from '@aws-sdk/client-translate';

import dotenv from '../contants/dotenv';

const translateClient = new TranslateClient({
  region: dotenv.AWS_REGION,
});

export default translateClient;
