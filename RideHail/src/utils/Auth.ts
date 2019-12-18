import * as bcrypt from 'bcrypt';

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
}