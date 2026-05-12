'use client';
import { useFormSchema } from '@/lib/hooks/useFormSchema';
import useTranslationAPI from '@/lib/hooks/useTranslationAPI';
import { createTranslateSchemas } from '@packages/common-types';
import {
  AreaInputField,
  Column,
  Form,
  IconButton,
  Paper,
  Row,
  SelectField,
  TitleIcon,
} from '@packages/daisy-ui-components';

const { translateTextSchema } = createTranslateSchemas({ lang: 'pt' });
const initialData = {
  text: 'Hello! I am a translator.',
  sourceLanguageCode: 'auto',
  targetLanguageCode: 'pt',
};

const TranslationView = () => {
  const { langOptions, translateTextQuery, translateResult } = useTranslationAPI();
  const { register, handleSubmit, setValue, watchValue, errors } = useFormSchema(
    translateTextSchema,
    initialData,
  );

  const handleTranslate = (data: any) => {
    translateTextQuery.mutate(data);
  };

  const handleInvertFields = () => {
    const currentSource = watchValue('sourceLanguageCode');
    const currentTarget = watchValue('targetLanguageCode');
    setValue('sourceLanguageCode', currentTarget);
    setValue('targetLanguageCode', currentSource);
  };

  const handleClear = () => {
    setValue('text', '');
    setValue('sourceLanguageCode', 'auto');
    setValue('targetLanguageCode', 'pt');
  };

  return (
    <Form onSubmit={handleSubmit(handleTranslate)}>
      <Paper>
        <TitleIcon icon="translate" title={'Tradutor'} />
        <Row responsive="lg">
          <Column flexX="start" gap={0}>
            <SelectField
              className="max-w-xs"
              options={langOptions}
              defaultValue={watchValue('sourceLanguageCode')}
              onChange={value => setValue('sourceLanguageCode', value)}
              error={errors.sourceLanguageCode?.message as string}
            />
            <AreaInputField
              className="min-h-80"
              placeholder="Type the text you want to translate here..."
              inputProps={register('text')}
              error={errors.text?.message as string}
            />
          </Column>
          <Column flexX="start" gap={0}>
            <SelectField
              className="max-w-xs"
              options={langOptions}
              defaultValue={watchValue('targetLanguageCode')}
              onChange={value => setValue('targetLanguageCode', value)}
              error={errors.targetLanguageCode?.message as string}
            />
            <AreaInputField
              className="min-h-80"
              placeholder="The translation will appear here..."
              inputProps={{ value: translateResult }}
              loading={translateTextQuery.isPending}
              disabled
            />
          </Column>
        </Row>
        <Row>
          <IconButton
            type="submit"
            color="primary"
            iconType="translate"
            loading={translateTextQuery.isPending}
          >
            Traduzir
          </IconButton>
          <IconButton type="button" mode="outline" iconType="brush" onClick={handleClear}>
            Limpar
          </IconButton>
        </Row>
      </Paper>
    </Form>
  );
};

export default TranslationView;
