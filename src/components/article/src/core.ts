import { Article } from "../resources/article.interface";
import * as Database from './../../database/src/interface';


/**
 * Find one Article by id
 * @param id of Article to find
 * @return the Article or null
 */
const findArticleById = (id: number): Promise<Article|null> => {
    return Database.client().article.findUnique({
        where: { id: id },
        include: { user: true }
    });
}

/**
 * Find one Article by name
 * @param name of Article to find
 * @returns the Article or null
 */
const findArticleByName = (name: string): Promise<Article|null> => {
    return Database.client().article.findUnique({
        where: { name: name },
        include: { user: true }
    });
}

/**
 * Find all Articles
 * @returns array of Articles
 */
const findAllArticles = (): Promise<Article[]> => {
    return Database.client().article.findMany({
        include: { user: true }
    });
}

/**
 * Create an Article
 * @param article to store
 * @returns stored Article
 */
const createArticle = (article: Article): Promise<Article> => {
    return Database.client().article.create({
        data: {
            name: article.name,
            price: article.price,
            user: {
                connect: {
                    id: article.userId
                }
            }
        }
    });
}

/**
 * Delete Article by id
 * @param id to delete Article
 * @returns deleted Article
 */
const deleteArticle = (id: number): Promise<Article> => {
    return Database.client().article.delete({
        where: { id: id }
    });
}


export { 
    // functions
    createArticle, 
    findArticleById, 
    findArticleByName, 
    findAllArticles ,
    deleteArticle
}