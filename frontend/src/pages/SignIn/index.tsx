import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  login: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const { signIn, signOut } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    signOut();
  }, [signOut]);

  async function handleSubmit(formData: SignInFormData): Promise<void> {
    try {
      const schema = Yup.object().shape({
        login: Yup.string()
          .required('Digite o login'),
        senha: Yup.string().min(6, 'No mínimo 6 caracters'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await signIn({
        login: formData.login,
        senha: formData.senha,
      });

      history.push('/sign-up');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);

        formRef?.current?.setErrors(validationErrors);
      } else if (err.isAxiosError) {
        if (err.response.status === 401)
          toast.error('Usuário e/ou senha inválidos');
      }
    }
  }

  return (
    <Container>
      <Content>
        <h2> Hummm Gostoso! </h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="login" placeholder="login" />
          <Input
            icon={FiLock}
            type="password"
            name="senha"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/sign-up">Não tem uma conta? Cadastre-se agora</Link>
      </Content>
    </Container>
  );
};

export default SignIn;
