create table movies (
	id int not null auto_increment,
	title varchar(40) not null,
	plot varchar(250),
	poster varchar(250),
	rating int not null,
	primary key (id)
);
create table genre (
	id int not null,
	genre varchar(30) not null,
	primary key (id)
);
create table movie_genre (
	mid int not null,
	gid int not null,
	foreign key (mid) references movies(id),
	foreign key (gid) references genre(id)
);
create table actor (
	id int not null auto_increment,
	firstname varchar(30),
	lastname varchar(30),
	primary key (id)
);
create table movie_actors (
	mid int not null,
	aid int not null,
	foreign key (mid) references movies(id),
	foreign key (aid) references actor(id)
);
