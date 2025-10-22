CREATE DATABASE IF NOT EXISTS quotes; USE quotes;

CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `character` VARCHAR(100),
    game VARCHAR(100),
    quote TEXT,
    uuid CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO quotes (`character`, game, quote) VALUES
("Mario", "Mario Bros", "It's me!"),
("Andrew Ryan", "BioSchock", "A man chooses, a slave obeys")