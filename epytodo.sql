CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE OR REPLACE TABLE user
(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE TABLE todo
(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP(),
  due_time datetime NOT NULL,
  status ENUM ('not started', 'todo', 'in progress', 'done') DEFAULT 'not started',
  user_id int
);

ALTER TABLE todo ADD FOREIGN KEY (user_id) REFERENCES user (id);
