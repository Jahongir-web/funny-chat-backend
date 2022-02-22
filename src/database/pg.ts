import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
  connectionString: process.env.PG_URL
})

const rows = async (SQL: string, ...params: any) => {

	const client = await pool.connect()

	try {
		const { rows } = await client.query(SQL, params)
		return rows
	}
	catch(err){
		console.error(err)
	}
	finally {
		client.release()
	}
}

const row = async (SQL: string, ...params: any) => {

	const client = await pool.connect()

	try {
		const { rows: [row] } = await client.query(SQL, params)
		return row
	}
	catch(err){
		console.error(err)
	}
	finally {
		client.release()
	}
}

export {
	rows,
	row,
}