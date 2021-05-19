
// types

type ChangesetCallback<T> = (c: Changeset<T> ) => Changeset<T>;
interface StringKeysObject { [key: string]: unknown };
interface Changeset<T> {
    valid: boolean,
    data: T
}


/**
 * Function that take an object and map this object from the given scheme
 * @param data - the object to map
 * @param params - the scheme that define the result structure
 * @return the mapped object
 */
const changeset = <T extends StringKeysObject>( data: StringKeysObject, scheme: string[] ): Changeset<T> => {
    let object: StringKeysObject = {};
    scheme.forEach((key: string) => {
        const splitted_key: string[] = key.split(':');
        let obj_path: string = '';
        let latest_path: string = '';
        splitted_key.forEach((key: string) => {
            obj_path += `['${key}']`;
            latest_path = `['${key}']`;
        });
        console.log("EVAL: ", `object${latest_path} = data${obj_path}`);
        eval(`object${latest_path} = data${obj_path}`);
    });
    return { valid: true, data: object as T }
}


// validator functions

/**
 * Validate if corresponding value og 'key' is included in given Set
 * @param key - key to take the value
 * @param set - to verify the inclusion
 * @returns the validated changeset
 */
const validate_inclusion = <T extends StringKeysObject>( key: string, set: Set<unknown> ): ChangesetCallback<T> => ( changeset: Changeset<T> ): Changeset<T> => {
    const outcome: boolean = set.has(changeset.data[key]);
    return { ...changeset, valid: changeset.valid && outcome }
}

/**
 * Validate if the values in key_list are included in the changeset
 * @param key_list - list of required keys
 * @returns the validated changeset
 */
const validate_required = <T extends StringKeysObject>( key_list: string[] ): ChangesetCallback<T> => ( changeset: Changeset<T> ): Changeset<T> => {
    let outcome: boolean = true;
    // check if all keys exists
    key_list.forEach((key: string) =>  outcome &&= !!changeset.data[key]);
    return { ...changeset, valid: changeset.valid && outcome };
}

/**
 * Validate if the values in key_list are not included in the changeset
 * @param key_list - list of not required keys
 * @returns the validated changeset
 */
const validate_exclusion = <T extends StringKeysObject>( key_list: string[] ): ChangesetCallback<T> => ( changeset: Changeset<T> ): Changeset<T> => {
    let outcome: boolean = true;
    // check id all keys not exists
    key_list.forEach((key: string) => outcome &&= !changeset.data[key]);
    return { ...changeset, valid: changeset.valid && outcome };
}

/**
 * Validate the given format of the given keys
 * @param tuple_list 
 * @returns 
 */
interface ValidatorItem { key: string, pattern: RegExp }
const validate_format = <T extends StringKeysObject>( tuple_list: ValidatorItem[] ): ChangesetCallback<T> => ( changeset: Changeset<T> ): Changeset<T> => {
    let outcome = true;
    tuple_list.forEach((item: ValidatorItem) => {
        outcome &&= new RegExp(item.pattern).test( String(changeset.data[item.key]) );
    });
    return { ...changeset, valid: changeset.valid && outcome };
}


export { 
    // types
    StringKeysObject, 
    Changeset, 
    ValidatorItem,
    ChangesetCallback,
    // functions
    changeset, 
    validate_inclusion, 
    validate_required, 
    validate_exclusion, 
    validate_format, 
}