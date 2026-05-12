import * as cdk from 'aws-cdk-lib';

import { LandingPageTemplateApp } from './templateApp';

const app = new cdk.App();

new LandingPageTemplateApp(app);
