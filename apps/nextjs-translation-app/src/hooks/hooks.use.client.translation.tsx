import { getDefaultLanguage } from '@apps/daisy-ui-storybook';

import { dictinaries } from './hook.use.server.translation';

export const useClientTranslations = () => {
  const lang = getDefaultLanguage();
  const translation = dictinaries[lang] || dictinaries['en'];
  const translate = (key: string) => translation[key] || 'NO_TEXT';
  return { lang, t: translate };
};
