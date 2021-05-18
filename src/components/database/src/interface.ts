import { getClient as getClientCore } from './core';

const client = () => {
    return getClientCore();
}

export { client }