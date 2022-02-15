import * as yup from 'yup';

export type IUpdateUserSchema = { email: string; password?: string; confirmPassword?: string };

export const updateUserSchema = yup.object({
  email: yup.string().required('O email é obrigatório').email('Deve ser um email valido'),
  password: yup.string(),
  confirmPassword: yup.string().test({
    test: (pass, ctx) => {
      return ctx.parent.password === pass;
    },
    message: 'As senhas não são iguais',
  }),
});
