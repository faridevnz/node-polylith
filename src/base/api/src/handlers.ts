import { Request, Response } from 'express';
import { findUser, findUsers, findUserByEmail, createUser, deleteUser, User } from './../../../components/user/src/interface';
import { createArticle, findAllArticles, findArticleByName, findArticleById, deleteArticle } from './../../../components/article/src/interface';
import * as Changeset from './../../../components/changeset/src/interface';
import { validate_exclusion, validate_format, validate_required } from '../../../components/changeset/src/interface';
import { pipe } from 'fp-ts/lib/function';
import { Article } from '../../../components/article/resources/article.interface';

// USER HANDLERS

const findAllUsersHandler = async (req: Request, res: Response) => {
    // find
    const users: User[] = await findUsers();
    res.send({ users: users });
}

const findUserByIdHandler = async (req: Request, res: Response) => {
    const params: any = req.params;
    // find
    const user: User|null = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    res.send({ ...user });
}

const createUserHandler = async (req: Request, res: Response) => {
    const body: {[key: string]: unknown} = req.body;
    // create and validate the changeset
    const userChangeset = Changeset.changeset<User>(body, ['email', 'name', 'id']); 
    let chs: Changeset.Changeset<User> = pipe(
        userChangeset,
        validate_required<User>(['email']),
        validate_format<User>([
            { key: 'email', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }, 
            { key: 'name', pattern: /^[A-Z]/ }
        ]),
        validate_exclusion<User>(['id'])
    );
    // check if user is valid
    if ( !chs.valid ) return res.status(404).send({ message: 'Bad Request' });
    // check if email altready exists
    const dbUser: User|null = await findUserByEmail( String(userChangeset.data.email) );
    if ( !!dbUser ) return res.status(409).send({ message: 'Conflict' });
    // create
    const created_user: User|null = await createUser(userChangeset.data);
    if ( !created_user ) res.status(400).send({ message: 'Bad Request' });
    res.send({ users: created_user });
}

const deleteUserHandler = async (req: Request, res: Response) => {
    const params = req.params;
    // check if user already exists
    const user: User|null = await findUser( parseInt(params.id) );
    if ( !user ) return res.status(404).send({ message: 'Not Found' });
    // delete
    const deleted_user: User = await deleteUser( parseInt(params.id) );
    res.send({ ...deleted_user });
}

// ARTICLES HANDLERS   

const findArticleByIdHandler = async (req: Request, res: Response) => {
    const params = req.params;
    const article: Article|null = await findArticleById( parseInt(params.id) );
    if ( !article ) return res.status(404).send({ message: 'Not Found' });
    res.send({ article });
}

const findAllArticlesHandler = async (req: Request, res: Response) => {
    const articles: Article[] = await findAllArticles();
    res.send({ articles });
}

const createArticleHandler = async (req: Request, res: Response) => {
    const body: { [key: string]: unknown } = req.body;
    // changeset creation and validation
    let articleChangeset: Changeset.Changeset<Article> = Changeset.changeset<Article>(body, ['name', 'price']);
    let chs = pipe(
        articleChangeset,
        validate_required(['name', 'price']),
        validate_exclusion(['id'])
        );
    if ( !chs.valid ) return res.status(400).send({ message: 'Bad Request' });
    // check if exists an Article with the same name
    const db_article: Article|null = await findArticleByName(chs.data.name);
    if ( !!db_article ) return res.status(409).send({ message: 'Conflict' });
    // create Article
    const created_article = await createArticle(chs.data);
    res.send({ ...created_article });
}

const deleteArticleHandler = async (req: Request, res: Response) => {
    const params = req.params;
    // check if Article with given id exists
    const article: Article|null = await findArticleById( parseInt(params.id) );
    if ( !article ) res.status(404).send({ message: 'Not Found' });
    // delete
    const deleted_article = await deleteArticle( parseInt(params.id) );
    res.send({ article: deleted_article });
}

export { 
    // user functions
    findUserByIdHandler, 
    findAllUsersHandler, 
    createUserHandler, 
    deleteUserHandler ,
    // article functions
    createArticleHandler,
    findAllArticlesHandler,
    findArticleByIdHandler,
    deleteArticleHandler
}