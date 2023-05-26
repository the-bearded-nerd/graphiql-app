import { SubmitHandler, useForm } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { PasswordInput, Stack, TextInput, Button } from '@mantine/core';

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
    const { name, email, password } = data;
    registerWithEmailAndPassword(name, email, password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack mt={20}>
        <TextInput
          label="Name"
          type="text"
          placeholder="type name"
          {...register('name', {
            required: true,
            pattern: /^[A-Z][a-z]{3,}$/,
          })}
          error={errors.name && `${t('Имя')}`}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="type email"
          {...register('email', {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          error={errors.email && `${t('Почта')}`}
        />

        <PasswordInput
          label="Password"
          type="password"
          placeholder="type password (Password1!)"
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]{8,}$/,
          })}
          error={errors.password && `${t('Пароль')}`}
        />

        <PasswordInput
          label="Repeat password"
          type="password"
          placeholder="repeat password (Password1!)"
          {...register('confirmPassword', {
            required: true,
            validate: (v) => v === password.current,
          })}
          error={errors.confirmPassword && `${t('Совпадение паролей')}`}
        />

        <Button type="submit" color={'custom-color'}>
          {t('Регистрация')}
        </Button>
      </Stack>
    </form>
  );
};
