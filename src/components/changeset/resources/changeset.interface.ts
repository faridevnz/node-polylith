
// interfaces
interface StringKeysObject { [key: string]: unknown };
interface Changeset<T> {
    valid: boolean,
    data: T
}

// types
type ChangesetCallback<T> = (c: Changeset<T> ) => Changeset<T>;

export { StringKeysObject, Changeset, ChangesetCallback }