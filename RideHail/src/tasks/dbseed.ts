import 'reflect-metadata';

import { createConnection } from 'typeorm';
import * as faker from 'faker';
import { forEach } from 'p-iteration';

import { typeOrmConfig } from '../config';
import { Drivers } from '../entities/drivers';
import { Consumers } from '../entities/consumers';
import Auth from '../utils/Auth';
import { User } from '../entities/user';
import { save } from '../repositories/consumer';

(async () => {

    const createUser = async (isConsumer: Boolean) => {

        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const email = faker.internet.email(firstname, lastname, 'gmail');
        const mobile = faker.phone.phoneNumberFormat(0);
        const password = faker.internet.password(8);
        console.log({ firstname, lastname, email, mobile, password });
        //https://github.com/Marak/faker.js/wiki/Phone
    
        var user: User;
        if(isConsumer) {
            user = new Consumers();
        }
        else {
            user = new Drivers();
        }
        user.firstName = firstname;
        user.lastName = lastname;
        user.email = email;
        user.passwordHash = await Auth.hashPassword(password);
        user.joinDate = new Date();
        user.mobile = mobile;
        return user;
    };

    console.log('*********** Begin Seed task *********** ');
    try {
        const conn = await createConnection(typeOrmConfig);

        const arr = Array.from({ length: 5 }).map(x => 'consumer');
        
        forEach(arr, async (str: String) => {
            const user = await createUser(str === 'consumer')
            await save(user as Consumers);
        });

        await conn.close();

    }
    catch(ex){
        console.error(ex);
    }
    finally {
        console.log('*********** End Seed task *********** ');
    }

})();