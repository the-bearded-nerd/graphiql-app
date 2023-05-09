import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div>
            <button type="button" onClick={toggle}>
                {t('Перевод')}
            </button>
        </div>
    );
};

export default LangSwitch;
