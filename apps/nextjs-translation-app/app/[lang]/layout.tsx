import {
  generateStaticParams,
  setTranslationEnv,
  useServerTranslations,
} from '@/src/hooks/hook.use.server.translation';
import {
  Icons,
  LangSettings,
  LoadScreen,
  NavbarTop,
  Row,
  Text,
  ThemeSettings,
  Toastify,
} from '@apps/daisy-ui-storybook';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export { generateStaticParams };

export async function generateMetadata(props: any): Promise<Metadata> {
  const { t } = await useServerTranslations(props);
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function PageLayout(props: any) {
  setTranslationEnv((await props.params)?.lang);
  const { t } = await useServerTranslations(props);

  return (
    <Suspense fallback={<LoadScreen />}>
      <NavbarTop
        leftComponent={
          <Row gap={4}>
            <Icons iconType="translate" iconSize="1.8rem" />
            <Text bold tag="h1" size="lg">
              {t('navbar.title')}
            </Text>
          </Row>
        }
        rightComponent={
          <Row flexX="end">
            <ThemeSettings />
            <LangSettings />
          </Row>
        }
      />
      <Toastify />
      {props.children}
    </Suspense>
  );
}
