import * as yup from 'yup';

export type ICreateUserSchema = { email: string; password: string; confirmPassword: string };

export const createUserSchema = yup.object({
  email: yup.string().required('O email é obrigatório').email('Deve ser um email valido'),
  password: yup.string().required('A senha é obrigatória'),
  confirmPassword: yup
    .string()
    .required('A confirmação da senha é obrigatória')
    .test({
      test: (pass, ctx) => {
        return ctx.parent.password === pass;
      },
      message: 'As senhas não são iguais',
    }),
});
