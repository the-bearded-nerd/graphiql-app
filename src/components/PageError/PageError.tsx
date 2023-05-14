import { useTranslation } from 'react-i18next';

import cls from './PageError.module.scss';

const PageError = () => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={cls['page-error']}>
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <button onClick={reloadPage}>{t('Обновить страницу')}</button>
    </div>
  );
};

export default PageError;
