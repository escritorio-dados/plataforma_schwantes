import * as yup from 'yup';

export type IDocSchema = {
  ano: string;
  titulo: string;
  tipo_trabalho: string;
  resumo?: string;
  link?: string;
  programa: string;
  campo: string;
  instituicao: string;
  tipo_instituicao: string;
  estado: string;
  palavras_chave?: string[];
  autor_first_name: string;
  autor_last_name: string;
  orientador_first_name?: string;
  orientador_last_name?: string;
};

const validateNumbers = (value: string) => /^[0-9]{4}$/g.test(value);

export const docSchema = yup.object({
  ano: yup
    .string()
    .required('O ano é obrigatório')
    .test({
      test: (value) => (value ? validateNumbers(value) : false),
      message: 'Deve ser um numero inteiro de 4 digitos',
    }),
  titulo: yup.string().required('O titulo é obrigatório'),
  tipo_trabalho: yup.string().required('O tipo de trabalho é obrigatório').nullable(),
  programa: yup.string().required('O programa é obrigatório').nullable(),
  campo: yup.string().required('O campo é obrigatório').nullable(),
  instituicao: yup.string().required('A instituição é obrigatória').nullable(),
  tipo_instituicao: yup.string().required('O tipo de instituição é obrigatório').nullable(),
  estado: yup.string().required('O estado é obrigatório').nullable(),
  autor_first_name: yup.string().required('O primeiro nome do autor é obrigatório'),
  autor_last_name: yup.string().required('O sobrenome do autor é obrigatório'),
});
