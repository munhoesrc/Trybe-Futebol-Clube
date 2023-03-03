import { ObjectSchema } from 'joi';
import { login } from './schema';
import Login from '../../interfaces/Login';

const validation = <T>(body: T, callback: ObjectSchema) => {
  const { error } = callback.validate(body);
  if (error) return error.message;
  return null;
};

// testando validação
const testValidation = (body: Login) => validation<Login>(body, login);

const next = () => ({});

export { testValidation, next };
