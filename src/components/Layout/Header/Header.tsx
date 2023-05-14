import cl from './Header.module.scss';
import LangSwitch from '../../LangSwitch/LangSwitch';
import { BugButton } from '../../BugButton/BugButton';
import { logout } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export const Header = () => {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const [prevPos, setPrevPos] = useState(window.pageYOffset);

  useEffect(() => {
    const scrollHandler = () => {
      const currentPos = window.pageYOffset;
      const el = headerRef.current as HTMLElement;
      el.style.height = prevPos > currentPos ? '60px' : '40px';
      el.style.backgroundColor = prevPos > currentPos ? '#ffffff' : '#0d3800';
      setPrevPos(currentPos);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [prevPos]);

  return (
    <header className={cl['header']} ref={headerRef}>
      <div className="container container_horizontal">
        <LangSwitch />
        {/* BugButton added for test purposes only! */}
        <BugButton />
        <button onClick={logout}>{t('выйти')}</button>
      </div>
    </header>
  );
};
