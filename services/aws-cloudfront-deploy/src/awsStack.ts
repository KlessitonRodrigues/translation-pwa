import * as cdk from 'aws-cdk-lib';

import { TranslationAppPage } from './translationApp';

const app = new cdk.App();

new TranslationAppPage(app);
