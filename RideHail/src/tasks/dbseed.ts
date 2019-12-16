import 'reflect-metadata';

import { createConnection } from 'typeorm';
import * as faker from 'faker';

import { typeOrmConfig } from '../config';

(async () => {

    console.log('*********** Begin Seed task *********** ');
    try {
        const conn = await createConnection(typeOrmConfig);
        
        faker.name.firstName();
    }
    catch(ex){
        console.error(ex);
    }
    finally {
        console.log('*********** End Seed task *********** ');
    }

})();