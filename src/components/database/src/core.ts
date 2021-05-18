import { PrismaClient } from '@prisma/client';

const getClient = () => {
    return new PrismaClient();
}

export { getClient }