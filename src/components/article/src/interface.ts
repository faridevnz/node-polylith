import { Article } from '../resources/article.interface';
import * as Core from './core';


const findAllArticles = (): Promise<Article[]> => Core.findAllArticles();
const findArticleById = (id: number): Promise<Article|null> => Core.findArticleById(id);
const findArticleByName = (name: string): Promise<Article|null> => Core.findArticleByName(name);
const createArticle = (article: Article): Promise<Article> => Core.createArticle(article);
const deleteArticle = (id: number): Promise<Article> => Core.deleteArticle(id);


export { 
    // functions
    createArticle, 
    findAllArticles, 
    findArticleById, 
    findArticleByName,
    deleteArticle
}