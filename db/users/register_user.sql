insert into meme_user (
    username,
    email,
    password,
    profile_pic
) values (
    $1,
    $2,
    $3,
    $4
)
returning user_id, username, email, profile_pic;