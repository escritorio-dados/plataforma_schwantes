import { hashSync } from 'bcrypt';
import { config } from 'dotenv';

import { User } from '../entities/User';

config();

export const DEFAULT_USER_ID = 'efb22058-90cf-41cc-8cd0-f63e62ad496f';

export const usersSeeds: Partial<User>[] = [
  {
    id: DEFAULT_USER_ID,
    email: process.env.APP_ROOT_USER_EMAIL,
    password: hashSync(process.env.APP_ROOT_USER_PASS, 10),
  },
];
