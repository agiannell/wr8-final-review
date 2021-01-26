update meme_user
set username = $1
where user_id = $2;

select user_id, username, email, profile_pic from meme_user
where user_id = $2;