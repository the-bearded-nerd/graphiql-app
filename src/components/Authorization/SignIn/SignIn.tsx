import cl from './SignIn.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { logInWithEmailAndPassword, auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

type Inputs = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [user, loading, error] = useAuthState(auth);

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const { email, password } = data;
    reset();
    logInWithEmailAndPassword(email, password);
    console.log(user, error);
  };

  return (
    <form className={cl['form']} onSubmit={handleSubmit(submitHandler)}>
      <input
        className={`${cl['input']}${
          errors.email ? ' ' + cl['input_invalid'] : ''
        }`}
        type="email"
        placeholder="type email"
        {...register('email', {
          required: true,
        })}
      />
      {errors.email && <span className={cl['error']}>{t('Почта')}</span>}
      <input
        className={`${cl['input']}${
          errors.password ? ' ' + cl['input_invalid'] : ''
        }`}
        type="password"
        placeholder="type password (Password1!)"
        {...register('password', {
          required: true,
        })}
      />
      {errors.password && <span className={cl['error']}>{t('Пароль')}</span>}
      <button type="submit">{t('Войти')}</button>
    </form>
  );
};
