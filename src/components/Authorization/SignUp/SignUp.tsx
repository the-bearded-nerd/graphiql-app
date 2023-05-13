import cl from './SignUp.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = useRef({});
  password.current = watch('password', '');

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const { name, email, password } = data;
    registerWithEmailAndPassword(name, email, password);
    reset();
  };

  return (
    <form className={cl['form']} onSubmit={handleSubmit(submitHandler)}>
      <input
        className={`${cl['input']}${
          errors.name ? ' ' + cl['input_invalid'] : ''
        }`}
        type="text"
        placeholder="type name"
        {...register('name', {
          required: true,
          pattern: /^[A-Z][a-z]{3,}$/,
        })}
      />
      {errors.name && <span className={cl['error']}>{t('Имя')}</span>}

      <input
        className={`${cl['input']}${
          errors.email ? ' ' + cl['input_invalid'] : ''
        }`}
        type="email"
        placeholder="type email"
        {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
          pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]{8,}$/,
        })}
      />
      {errors.password && <span className={cl['error']}>{t('Пароль')}</span>}

      <input
        className={`${cl['input']}${
          errors.password ? ' ' + cl['input_invalid'] : ''
        }`}
        type="password"
        placeholder="repeat password (Password1!)"
        {...register('confirmPassword', {
          required: true,
          validate: (v) => v === password.current,
        })}
      />
      {errors.confirmPassword && (
        <span className={cl['error']}>{t('Совпадение паролей')}</span>
      )}

      <button type="submit">{t('Регистрация')}</button>
    </form>
  );
};
