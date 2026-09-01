import { LoadScreen } from '@apps/daisy-ui-storybook';
import { Suspense } from 'react';

export default function RootPage() {
  return <Suspense fallback={<LoadScreen />} />;
}
