CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60),
    rating INT,
    overview VARCHAR(300)
);
