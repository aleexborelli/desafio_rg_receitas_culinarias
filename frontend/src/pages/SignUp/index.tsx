import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignUpFormData {
  nome: string;
  login: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),
          login: Yup.string()
            .required('Login é obrigatório'),
          senha: Yup.string().min(6, 'No mínimo 6 caracters'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/usuarios', data);

        toast.success('Cadastro realizado com sucesso!');

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <h3>Hummm Gostoso!</h3>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiUser} name="nome" placeholder="Nome" />
          <Input icon={FiMail} name="login" placeholder="Login" />
          <Input
            icon={FiLock}
            type="password"
            name="senha"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/">Já tem uma conta? Logue-se agora</Link>
      </Content>
    </Container>
  );
};

export default SignUp;
