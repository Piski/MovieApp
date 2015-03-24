create database if not exists movieapp;
use movieapp;
create table movies (
	id int not null auto_increment,
	title varchar(40) not null,
	plot varchar(250),
	poster varchar(250),
	rating double not null,
	primary key (id)
);
create table genre (
    id int not null auto_increment,
	genre varchar(30) not null,
	primary key (id)
);
create table movie_genres (
	mid int not null,
	gid int not null,
	foreign key (mid) references movies(id),
	foreign key (gid) references genre(id)
);
create table actor (
	id int not null auto_increment,
	name varchar(50),
	primary key (id)
);
create table movie_actors (
	mid int not null,
	aid int not null,
	foreign key (mid) references movies(id),
	foreign key (aid) references actor(id)
);
