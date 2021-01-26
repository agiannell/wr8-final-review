create table meme_user (
  user_id serial primary key,
  username varchar(20) not null,
  email varchar(150) not null,
  password varchar(250) not null,
  profile_pic text
);

create table meme_post (
  post_id serial primary key,
  user_id int references meme_user(user_id),
  post_url text
);