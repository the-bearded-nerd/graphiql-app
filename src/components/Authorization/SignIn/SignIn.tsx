import { SubmitHandler, useForm } from 'react-hook-form';
import { logInWithEmailAndPassword } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { PasswordInput, Stack, TextInput, Button } from '@mantine/core';

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

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    reset();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack mt={20}>
        <TextInput
          label="Email"
          type="email"
          placeholder="type email"
          {...register('email', {
            required: true,
          })}
          error={errors.email && `${t('Почта')}`}
        />
        <PasswordInput
          label="Password"
          error={errors.password && `${t('Пароль')}`}
          placeholder="type password (Password1!)"
          {...register('password', {
            required: true,
          })}
        />
        <Button type="submit" color={'custom-color'}>
          {t('Войти')}
        </Button>
      </Stack>
    </form>
  );
};
