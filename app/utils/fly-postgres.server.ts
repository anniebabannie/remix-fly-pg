import pg from 'pg';
// const pool = new pg.Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || '5432'),
// })

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});

async function pgGet(query: string) {
  const client = await pool.connect()
  try {
      const res = await client.query(query)
      return res.rows
  } catch (err) {
      console.error(err);
  } finally {
      await client.release()
  }
}

export async function getUser(id: string) {
  const user =  await pgGet(`SELECT * FROM users WHERE id = ${id}`);
  return user[0];
}

export async function getUsers() {
  return await pgGet(`SELECT * FROM users`);
}

export async function createUser(name: string, email: string) {
  const user = await pgGet(`INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING *`);
  return user[0];
}