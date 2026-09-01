import TranslationView from '@/src/components/translations/translation.view';
import { Page, PageContent } from '@apps/daisy-ui-storybook';

export default async function TemplatePage() {
  return (
    <Page className="mt-8">
      <PageContent>
        <TranslationView />
      </PageContent>
    </Page>
  );
}
