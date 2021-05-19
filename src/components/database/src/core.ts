import { PrismaClient } from '@prisma/client';


/**
 * Function that return the prisma client
 * @returns 
 */
const getClient = (): PrismaClient => new PrismaClient();


export { 
    // functions
    getClient 
}