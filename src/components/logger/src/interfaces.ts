import * as Core from './core';


const info = (message: unknown): void => Core.info(message);
const express = (): any => Core.express();


export { 
    // functions
    info,
    express
}