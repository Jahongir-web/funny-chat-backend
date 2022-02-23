const CHECK_EMAIL = `
  select user_email from users where user_email = $1
`

const SIGNUP = `
  insert into users (user_name, user_email, password) values ($1, $2, crypt($3, gen_salt('bf'))) returning *;
`

const LOGIN =`
  select 
    * 
  from 
   users 
  where 
    user_email = $1 and password = crypt($2, password)
`

const USERS_MESSAGES = `
    select u.user_id, u.user_name, u.user_email, u.is_active, count(m.author_id) from users as u left join messages as m on u.user_id = m.author_id where m.user_id = $1 and m.is_read = false group by m.author_id, u.user_id 
`

const USERS = `
    select user_id, user_name, user_email, is_active from users 
`


const MESSAGES = `
    select message_id, message_text, message_file, author_id, user_id, to_char(created_at,'HH12:MI') as date from messages
`

const NEW_MESSAGE = `
    insert into messages (message_text, message_file, author_id, user_id) values ($1, $2, $3, $4) returning *
`

const READ_MESSAGE = `
  update messages set is_read = true where author_id = $1 and user_id = $2
`

const USERS_STATUS = `
  update users set is_active = $1 where user_id = $2
`



export default {
  CHECK_EMAIL,
  SIGNUP,
  LOGIN,
  USERS,
  USERS_MESSAGES,
  MESSAGES,
  NEW_MESSAGE,
  READ_MESSAGE,
  USERS_STATUS,
}