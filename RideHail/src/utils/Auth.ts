import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import { resolve } from 'dns';

export default class Auth {

    private static hashRounds : number = 6;

    public static async hashPassword(password: string) {
        const result: any = await new Promise((resolve, reject) => {
            bcrypt.hash(password, this.hashRounds, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            });
        });
        return result;
    }

    public static async comparePasswords(userPassword:string, encrypted: string) {
       return new Promise((resolve, reject) => {

            bcrypt.compare(userPassword, encrypted, (err, isSame) => {
                if(err) reject(err);
                resolve(isSame);
            });
        });
    }

    public static async generateJWT(user: User, type: String) {
        return new Promise((resolve, reject) => {

            const { id, email, firstName, lastName } = user;
            jwt.sign({
                id, email, firstName, lastName, type
            }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '1d' }, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
    }
}