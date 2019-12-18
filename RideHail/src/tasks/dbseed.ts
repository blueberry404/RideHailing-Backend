import 'reflect-metadata';

import { createConnection } from 'typeorm';
import * as faker from 'faker';

import { typeOrmConfig } from '../config';
import { Drivers } from '../entities/drivers';
import { Consumers } from '../entities/consumers';
import Auth from '../utils/Auth';
import { User } from '../entities/user';
import { save } from '../repositories/consumer';

(async () => {

    console.log('*********** Begin Seed task *********** ');
    try {
        const conn = await createConnection(typeOrmConfig);
        //TODO: 
        await save(createUser(false));

        await conn.close();

    }
    catch(ex){
        console.error(ex);
    }
    finally {
        console.log('*********** End Seed task *********** ');
    }

})();

const createUser = async (isDriver: Boolean) => {

    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.exampleEmail(firstname, lastname);
    const mobile = faker.phone.phoneNumberFormat(0);
    const password = faker.internet.password(8);
    console.log({ firstname, lastname, email, mobile, password });
    //https://github.com/Marak/faker.js/wiki/Phone

    var user: User;
    if(isDriver) {
        user = new Drivers();
    }
    else {
        user = new Consumers();
    }
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    user.passwordHash = await Auth.hashPassword(password);
    user.joinDate = new Date();
    user.mobile = mobile;
    return user;
};