CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60),
    rating INT,
    release_date VARCHAR(20),
    overview VARCHAR(500)
);
