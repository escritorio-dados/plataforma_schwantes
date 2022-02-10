import * as yup from 'yup';

export type ISearchSchema = {
  search?: string;
  tipo_trabalho?: string[];
  campo?: string[];
  tipo_instituicao?: string[];
  instituicao?: string[];
  programa?: string[];
  estado?: string[];
  min_ano?: string;
  max_ano?: string;
};

// const transformNumber = (value?: string) => {
//   if (value) {
//     value.replace('.');
//   }
// };

const validateNumbers = (value: string) => /^[0-9]{4}$/g.test(value);

export const SearchSchema = yup.object({
  min_ano: yup.string().test({
    test: (value) => (value ? validateNumbers(value) : true),
    message: 'Deve ser um numero inteiro de 4 digitos',
  }),
  max_ano: yup.string().test({
    test: (value) => (value ? validateNumbers(value) : true),
    message: 'Deve ser um numero inteiro de 4 digitos',
  }),
});
