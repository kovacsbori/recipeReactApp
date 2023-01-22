import * as SQLite from 'expo-sqlite';

const createTable = (name, fields) => {
    const db = SQLite.openDatabase("recipeApp");
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${name} (${fields})`,
            [],
            (_, res) => console.log("Successfully created table", name),
            (_, error) => console.log('Error happened:', error)
        );
    });
};

const dropTable = (name) => {
    const db = SQLite.openDatabase("recipeApp");
    db.transaction(tx => {
        tx.executeSql(
            `DROP TABLE ${name}`,
            [],
            (_, res) => console.log("Successfully deleted table", name),
            (_, error) => console.log('Error happened:', error)
        );
    });
};


const insertIntoRecipes = (id, title, ingredients, description, imageURL) => {
    const db = SQLite.openDatabase("recipeApp");
    db.transaction(tx => {
        tx.executeSql(
            `INSERT OR IGNORE INTO recipes (id, title, ingredients, description, imageURL) VALUES (?, ?, ?, ?, ?)`,
            [id, title, ingredients, description, imageURL],
            (_, res) => console.log("Successfully inserted values into table"),
            (_, error) => console.log('Error happened:', error)
        );
    });
};

const printAllRows = (table) => {
    const db = SQLite.openDatabase("recipeApp");
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${table}`,
            [],
            (_, res) => console.log(res.rows._array),
            (_, error) => console.log(error)
        )
    })
}

export { createTable, dropTable, insertIntoRecipes, printAllRows }