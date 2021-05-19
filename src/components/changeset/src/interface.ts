import * as Core from './core';
import { Changeset } from './core';


const changeset = <T extends Core.StringKeysObject>( data: Core.StringKeysObject, scheme: string[] ): Core.Changeset<T> => {
    return Core.changeset<T>(data, scheme);
}
const validate_inclusion = <T extends Core.StringKeysObject>( key: string, set: Set<unknown> ): Core.ChangesetCallback<T> => {
    return Core.validate_inclusion<T>(key, set);
}
const validate_exclusion = <T extends Core.StringKeysObject>( key_list: string[] ): Core.ChangesetCallback<T> => {
    return Core.validate_exclusion<T>(key_list);
}
const validate_required = <T extends Core.StringKeysObject>( key_list: string[] ): Core.ChangesetCallback<T> => {
    return Core.validate_required<T>(key_list);
}
const validate_format = <T extends Core.StringKeysObject>( tuple_list: Core.ValidatorItem[] ): Core.ChangesetCallback<T> => {
    return Core.validate_format<T>(tuple_list)
}


export { 
    // types
    Changeset, 
    // functions
    changeset, 
    validate_exclusion, 
    validate_inclusion, 
    validate_required,
    validate_format
}