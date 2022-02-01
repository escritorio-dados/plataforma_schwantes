export const userErrors = {
  onlyRootUser: {
    message: 'Only the root user can execute this action',
    userMessage: 'Somente o usuario raiz pode executar essa ação',
    statusCode: 401,
  },
  passwordInvalid: {
    message: 'Invalid password',
    userMessage: 'Senha Invalida',
  },
  oldPasswordInvalid: {
    message: 'Old password invalid',
    userMessage: 'Senha Antiga Invalida',
  },
  duplicateEmail: {
    message: 'This email is already registered',
    userMessage: 'Este e-mail já está cadastrado',
  },
  notFound: {
    message: 'User not found',
    userMessage: 'Usuario não encontrado',
  },
  cannotBeDeleted: {
    message: 'This user cannot be deleted',
    userMessage: 'Este usuario não pode ser excluido',
    statusCode: 401,
  },
  cannotDeleteYourself: {
    message: "it's not possible to delete yourself",
    userMessage: 'Não é possivel deletar o proprio usuario',
  },
};
