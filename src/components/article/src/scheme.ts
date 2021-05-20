import { pipe } from 'fp-ts/lib/function';
import { Article } from './../resources/article.interface';
import * as Changeset from '../../changeset/src/interface';


/**
 * Article scheme
 */
const scheme: string[] = [
    'name', 
    'price', 
    'userId'
];

/**
 * Generate User Changeset from data
 * @param data 
 * @returns 
 */
const article_changeset = (data: { [key: string]: unknown }): Changeset.Changeset<Article> => {
    const changeset = Changeset.changeset<Article>(data, scheme);
    return pipe(
        changeset,
        Changeset.validate_required(['name', 'price', 'userId']),
        Changeset.validate_exclusion(['id'])
    );
}


export { 
    // functions
    article_changeset
}