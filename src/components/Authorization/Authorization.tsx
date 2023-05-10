import cl from './Authorization.module.scss';

const Authorization = () => {
  return (
    <form className={cl['form']}>
      <input className={cl['input']} type="email" placeholder="type email" />
      <input
        className={cl['input']}
        type="password"
        placeholder="type password"
      />
    </form>
  );
};

export default Authorization;
