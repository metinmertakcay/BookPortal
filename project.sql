CREATE TABLE state(
	sid SERIAL NOT NULL,
	sname varchar(30) NOT NULL,
	PRIMARY KEY(sid)
);

INSERT INTO state (sname) VALUES('Okudum');
INSERT INTO state (sname) VALUES('Favori Kitaplarıma Ekle');

CREATE TABLE role(
	rid SERIAL NOT NULL,
	type varchar(10) NOT NULL,
	PRIMARY KEY (rid)
);

INSERT INTO role (type) VALUES('Admin');
INSERT INTO role (type) VALUES('User');

CREATE TABLE users(
	uid SERIAL NOT NULL,
	email varchar(30) UNIQUE NOT NULL,
	name varchar(20) NOT NULL,
	password varchar(30) NOT NULL,
	rid int,
	FOREIGN KEY(rid) REFERENCES role(rid) ON DELETE CASCADE,
	PRIMARY KEY(uid)
);

INSERT INTO users (email, name, password, rid) VALUES('metin@gmail.com', 'metin', '1', 1);
INSERT INTO users (email, name, password, rid) VALUES('ali@gmail.com', 'ali', '2', 1);
INSERT INTO users (email, name, password, rid) VALUES('veli@gmail.com', 'veli', '3', 2);
INSERT INTO users (email, name, password, rid) VALUES('ayşe@gmail.com', 'ayşe', '4', 2);
INSERT INTO users (email, name, password, rid) VALUES('fatme@gmail.com', 'fatma', '5', 2);
INSERT INTO users (email, name, password, rid) VALUES('mehmet@gmail.com', 'mehmet', '6', 2);

CREATE TABLE writer(
	wid SERIAL NOT NULL,
	name varchar(20) NOT NULL,
	surname varchar(20) NOT NULL,
	PRIMARY KEY(wid)
);

INSERT INTO writer (name, surname) VALUES('Peyami', 'Safa');
INSERT INTO writer (name, surname) VALUES('Halit Ziya', 'Uşaklıgil');
INSERT INTO writer (name, surname) VALUES('Halide Edip', 'Adıvar');
INSERT INTO writer (name, surname) VALUES('Ahmet', 'Ümit');
INSERT INTO writer (name, surname) VALUES('Mehmet Akif', 'Ersoy');

CREATE TABLE book(
	bid SERIAL NOT NULL,
	uid int,
	wid int,
	name varchar(30),
	PRIMARY KEY(bid),
	FOREIGN KEY(uid) REFERENCES users(uid) ON DELETE CASCADE,
	FOREIGN KEY(wid) REFERENCES writer(wid) ON DELETE CASCADE
);

INSERT INTO book (uid, wid, name) VALUES(1, 1, 'Sözde Kızlar');
INSERT INTO book (uid, wid, name) VALUES(1, 1, 'Yalnızız');
INSERT INTO book (uid, wid, name) VALUES(1, 1, 'Biz İnsanlar');
INSERT INTO book (uid, wid, name) VALUES(1, 1, 'Şimşek');
INSERT INTO book (uid, wid, name) VALUES(1, 1, 'Canan');
INSERT INTO book (uid, wid, name) VALUES(1, 2, 'Mai ve Siyah');
INSERT INTO book (uid, wid, name) VALUES(1, 2, 'Kırık Hayatlar');
INSERT INTO book (uid, wid, name) VALUES(1, 2, 'Bir Ölünün Defteri');
INSERT INTO book (uid, wid, name) VALUES(1, 2, 'İhtiyar Dost');
INSERT INTO book (uid, wid, name) VALUES(1, 3, 'Ateşten Gömlek');
INSERT INTO book (uid, wid, name) VALUES(2, 3, 'Sinekli Bakkal');
INSERT INTO book (uid, wid, name) VALUES(2, 3, 'Vurun Kahpeye');
INSERT INTO book (uid, wid, name) VALUES(2, 3, 'Handan');
INSERT INTO book (uid, wid, name) VALUES(2, 4, 'İstanbul Hatırası');
INSERT INTO book (uid, wid, name) VALUES(2, 4, 'Patasana');
INSERT INTO book (uid, wid, name) VALUES(2, 4, 'Sultanı Öldürmek');
INSERT INTO book (uid, wid, name) VALUES(2, 4, 'Sis ve Gece');
INSERT INTO book (uid, wid, name) VALUES(2, 5, 'Safahat');
INSERT INTO book (uid, wid, name) VALUES(2, 5, 'Asım');
INSERT INTO book (uid, wid, name) VALUES(2, 5, 'Hakkın Sesleri');

CREATE TABLE userbook(
	uid int,
	bid int,
	sid int,
	FOREIGN KEY(sid) REFERENCES state(sid) ON DELETE CASCADE,
	PRIMARY KEY(uid, bid)
);

INSERT INTO userbook VALUES(3, 1, 1);
INSERT INTO userbook VALUES(3, 2, 2);
INSERT INTO userbook VALUES(4, 3, 1);
INSERT INTO userbook VALUES(4, 4, 2);
INSERT INTO userbook VALUES(5, 5, 1);