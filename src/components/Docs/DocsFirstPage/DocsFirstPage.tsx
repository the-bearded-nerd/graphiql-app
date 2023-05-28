import { useTranslation } from 'react-i18next';
import { DocsFirstPage as IDocsFirstPage } from '../types/types';
import { Divider, createStyles } from '@mantine/core';

interface DocsFirsPageProps {
  elemToShow: IDocsFirstPage;
}
const useStyles = createStyles({
  label: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export function DocsFirstPage({ elemToShow }: DocsFirsPageProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <div>
      <div>{elemToShow.name}</div>
      <div>{elemToShow.description}</div>
      <Divider
        label={`${t('Root Type')}`}
        labelPosition={'left'}
        my="lg"
        classNames={{ label: classes.label }}
      />
      <div>
        {t('query')}: <span className="type_name">{t('Query')}</span>
      </div>
    </div>
  );
}
