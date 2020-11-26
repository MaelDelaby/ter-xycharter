const { SQLUnknowError } = require('../exceptions/SQLUnknowError');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'testing',
    host: 'postgres',
    database: 'graphs',
    password: 'bla123',
    port: 5432,
})

const createGraph = async (type) => {
    try {
        const result = await pool.query('INSERT INTO Graphs (Type) VALUES ($1) RETURNING *', [type]);

        return result.rows[0].id.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

const deleteGraph = async (graphId) => {
    try {
        //Suppression de tout les graphs
        await pool.query('DELETE FROM Graphs WHERE idgraph = ($1)', [graphId]);

        //Suppression de tout les liens en lien avec ce graph
        await pool.query('DELETE FROM LinkDataSetGraph WHERE idgraph = ($1)', [graphId]);

        return "DELETED";
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    createGraph,
    deleteGraph
}