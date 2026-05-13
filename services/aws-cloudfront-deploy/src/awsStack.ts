import * as cdk from 'aws-cdk-lib';

import { TranslationAppPage } from './templateApp';

const app = new cdk.App();

new TranslationAppPage(app);
