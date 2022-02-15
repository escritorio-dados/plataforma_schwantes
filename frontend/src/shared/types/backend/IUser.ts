export const DEFAULT_USER_ID = 'efb22058-90cf-41cc-8cd0-f63e62ad496f';

export type IUser = { id: string; email: string };

export type IUpdateUserInput = { email: string; password?: string };

export type ICreateUserInput = { email: string; password: string };
