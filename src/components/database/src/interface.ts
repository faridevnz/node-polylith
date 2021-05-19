import { PrismaClient } from '.prisma/client';
import * as Core from './core';


const client = (): PrismaClient => Core.getClient();


export { 
    // functions
    client 
}