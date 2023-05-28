import { useTranslation } from 'react-i18next';
import { Switch, createStyles, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  trackLabel: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray,
  },
  track: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors['custom-color'][8]
        : theme.colors.gray[3],
  },
}));

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const trackColor = theme.colorScheme === 'dark' ? 'custom-color.8' : 'gray.3';

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Switch
      checked={i18n.language === 'ru'}
      onChange={toggle}
      onLabel="EN"
      offLabel="RU"
      color={trackColor}
      size={'lg'}
      classNames={{
        trackLabel: classes.trackLabel,
        track: classes.track,
      }}
    />
  );
};

export default LangSwitch;
