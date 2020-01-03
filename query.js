const Pool = require('pg').Pool
const db_details = require("./config/config")
const pool = new Pool({
  user: db_details.username,
  host: db_details.host,
  database: db_details.database,
  password: db_details.password,
  port: db_details.port
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const user_id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE user_id = $1', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, password, email, created_on, last_login } = request.body

  pool.query('INSERT INTO users (username, password, email, created_on, last_login) VALUES ($1, $2, $3, $4, $5)', [username, password, email, created_on, last_login], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({username, password, email, created_on, last_login});
  })
}


const updateUser = (request, response) => {
  const user_id = parseInt(request.params.id)
  const { username, password, email, created_on, last_login } = request.body

  pool.query(
    'UPDATE users SET username = $1, password = $2, email = $2, created_on = $2, last_login = $5 WHERE user_id = $3',
    [username, password, email, created_on, last_login, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const user_id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${user_id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}