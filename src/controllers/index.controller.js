if (process.env.NODE_ENV =! 'production') {
    require('dotenv').config()
}

const {Pool} = require('pg')


//console.log(process.env.DB_NAME)

const pool= new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})



//lista os dados de todos os usuários
const getUsers = async (req, res) => {
     const response = await pool.query('SELECT * FROM users');
     res.status(200).json(response.rows);
 
 }

//lista os dados de um usuário especifico
const getUsersById = async(req, res) => {

        const id = req.params.id
        const response= await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.json(response.rows)

}



//cria usuários para o banco de dados 
const createUsers = async (req, res) => {
    const {name, email} = req.body;
    const response= await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name,email])
    console.log(response);
    res.json({
        message: "Usuário adicionado com sucessso",
        body: {
            user: {name,email}
        }
    })
    
    

}

//remove os usuários do banco de dados 

const deleteUsers = async (req, res) => {
        const id = req.params.id
        const response = await pool.query('DELETE FROM users WHERE id = $1', [id])
        console.log(response)
        res.json(`Usuário ${id} foi removido com sucesso`)
};


//edita os dados de um usuário 

const updateUsers = async (req, res) => {
    const id = req.params.id
    const {name, email} = req.body;
   const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ])
    console.log(response);
    res.json('Usuário Atualizado com sucesso')
    
};



module.exports = {
    getUsers,
    createUsers,
    getUsersById,
    deleteUsers,
    updateUsers,

};