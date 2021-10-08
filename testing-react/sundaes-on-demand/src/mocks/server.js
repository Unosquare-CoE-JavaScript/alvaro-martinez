import { handlers } from './handlers';
import { setupServer } from 'msw';

export const server = setupServer(...handlers);
