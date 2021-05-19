import * as Core from './core';
import { Changeset } from './core';

const changeset = <T extends Core.StringKeysObject>( data: Core.StringKeysObject, scheme: string[] ): Core.Changeset<T> => {
    return Core.changeset<T>(data, scheme);
}
const validate_inclusion = ( key: string, set: Set<unknown> ) => {
    return Core.validate_inclusion(key, set);
}
const validate_exclusion = ( key_list: string[] ) => {
    return Core.validate_exclusion(key_list);
}
const validate_required = ( key_list: string[] ) => {
    return Core.validate_required(key_list);
}

export { changeset, validate_exclusion, validate_inclusion, validate_required, Changeset }