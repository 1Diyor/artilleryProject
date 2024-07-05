import { fork, allSettled } from 'effector';
import { $databases, addDatabase, selectDatabase, $selectedDatabase, addDatabaseFx } from "../../entities/database";

// jest.mock('@shared/api/database');

describe('addDatabaseFx effect', () => {
    test('should fetch and add a new database', async () => {
        const scope = fork();

        expect(scope.getState($databases)).toEqual([{ name: 'Database1' }]);

        await allSettled(addDatabase, { scope });

        expect(scope.getState($databases)).toEqual([{ name: 'Database2' }]);
    });
});

// describe('addDatabase event', () => {
//     test('should add a new database to the store', async () => {
//         const scope = fork();
//         await allSettled(addDatabase, { scope }); // Trigger the addDatabase event
//         expect(scope.getState($databases)).toEqual([{ name: 'Database1' }]); // Check that the database was added
//     });
// });


// describe('selectDatabase event', () => {
//     test('should select a database', async () => {
//         const scope = fork();
//         const database = { name: 'Database1' };
//         await allSettled(selectDatabase, { scope, params: database }); // Trigger the selectDatabase event
//         expect(scope.getState($selectedDatabase)).toEqual(database); // Check that the database was selected
//     });
// });


// addDatabase chaqirilsa u xechnarsa qabul qilmaydi
// bu harakat addDatabaseFx run qiladi oqibatta getDatabase chaqiradi
// getDatabase yangi object qaytaradi
// yangi object $databases storega qo'shiladi