# TodoWebApp


create table todouser(
  id int auto_increment,
  name varchar(50),
  email varchar(30) unique,
  password varchar(15) 
)


create table todotask(
  id varchar(50) unique,
  userId int,
  task varchar(500),
  status enum('done', 'pending', 'in progress', 'completed'),
  date date,
  time time
)