DROP TABLE If EXIST users CASCADE;
DROP TABLE If EXIST crimes CASCADE;

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	password_digest VARCHAR NOT NULL
);

CREATE TABLE crimes (
	id BIGSERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id),
	offense VARCHAR NOT NULL,
	place_of_occurrance VARCHAR NOT NULL,
	borough VARCHAR NOT NULL
);