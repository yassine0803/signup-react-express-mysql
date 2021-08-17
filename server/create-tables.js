import { sqldb } from "./config/index.js";

const createTables = () => {
  //create user tables
  sqldb.query(
    `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL,
        username VARCHAR(255) NULL,
        profileImg VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        password VARCHAR(255) NULL,
        PRIMARY KEY (id))`
  );

  //create images table
  sqldb.query(
    `CREATE TABLE IF NOT EXISTS galleryImg (
            id INT NOT NULL AUTO_INCREMENT,
            image VARCHAR(255) NULL,
            user_id INT NOT NULL,
            PRIMARY KEY (id, user_id),
            INDEX fk_galleryImg_user1_idx (user_id ASC),
            CONSTRAINT fk_galleryImg_user1
              FOREIGN KEY (user_id)
              REFERENCES users (id))`
  );
};

createTables();
