import { DBConfig } from 'ngx-indexed-db';
export const dbConfig: DBConfig = {
    name: 'Employee',
    version: 3,
    objectStoresMeta: [{
      store: 'employees',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        { name: 'joiningDate', keypath: 'joiningDate', options: { unique: false } },
        { name: 'noDate', keypath: 'nodDate', options: { unique: false } }
      ]
    }]
  };