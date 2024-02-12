import dotenv from 'dotenv';
import { join } from 'path';
import server from './server';

dotenv.config({ path: join(__dirname, '..', '.env') });

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
