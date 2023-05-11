import { useTranslation } from 'react-i18next';
import { RssIcon } from '../../Icons';
import cl from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={cl['footer']}>
      <div className="container container_horizontal">
        <a href="https://rs.school/react/" target="_blank">
          <RssIcon />
        </a>
        2023
        <div className={cl['links']}>
          <a href="https://github.com/avsamoilava" target="_blank">
            {t('Саша')}
          </a>
          <a href="https://github.com/the-bearded-nerd" target="_blank">
            {t('Дима')}
          </a>
        </div>
      </div>
    </footer>
  );
};
