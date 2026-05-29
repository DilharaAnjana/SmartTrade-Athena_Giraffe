-- ============================================================
--  NeonGear — Manual DDL (mirrors what Hibernate would create)
--  Run this if you want to seed data BEFORE starting the app.
-- ============================================================
USE neongear;

CREATE TABLE IF NOT EXISTS status (
  id    INT          NOT NULL AUTO_INCREMENT,
  value VARCHAR(45)  NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS city (
  id   INT         NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery_types (
  id    INT          NOT NULL AUTO_INCREMENT,
  name  VARCHAR(50)  NOT NULL,
  price DOUBLE       NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS brand (
  id   INT          NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS model (
  id       INT          NOT NULL AUTO_INCREMENT,
  name     VARCHAR(100) NOT NULL,
  brand_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (brand_id) REFERENCES brand(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS color (
  id    INT         NOT NULL AUTO_INCREMENT,
  value VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS quality (
  id    INT         NOT NULL AUTO_INCREMENT,
  value VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS storage (
  id    INT         NOT NULL AUTO_INCREMENT,
  value VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS discount (
  id          INT          NOT NULL AUTO_INCREMENT,
  coupon_code VARCHAR(45)  NOT NULL UNIQUE,
  value       DOUBLE       NOT NULL,
  started_at  DATETIME     NOT NULL,
  expired_at  DATETIME     NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id                INT          NOT NULL AUTO_INCREMENT,
  first_name        VARCHAR(45)  NOT NULL,
  last_name         VARCHAR(45)  NOT NULL,
  email             VARCHAR(150) NOT NULL UNIQUE,
  password          VARCHAR(20)  NOT NULL,
  verification_code VARCHAR(15)  NOT NULL,
  status_id         INT          NOT NULL,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (status_id) REFERENCES status(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS address (
  id         INT          NOT NULL AUTO_INCREMENT,
  line1      VARCHAR(200) NOT NULL,
  line2      VARCHAR(200),
  postal_code VARCHAR(10),
  city_id    INT,
  user_id    INT,
  status_id  INT,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (city_id)   REFERENCES city(id),
  FOREIGN KEY (user_id)   REFERENCES users(id),
  FOREIGN KEY (status_id) REFERENCES status(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS seller (
  id             INT          NOT NULL AUTO_INCREMENT,
  company_name   VARCHAR(200) NOT NULL,
  company_mobile VARCHAR(10)  NOT NULL,
  company_email  VARCHAR(100) NOT NULL,
  status_id      INT,
  user_id        INT UNIQUE,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (status_id) REFERENCES status(id),
  FOREIGN KEY (user_id)   REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product (
  id          INT          NOT NULL AUTO_INCREMENT,
  title       VARCHAR(200) NOT NULL,
  description TEXT         NOT NULL,
  model_id    INT,
  color_id    INT,
  quality_id  INT,
  storage_id  INT,
  seller_id   INT,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (model_id)   REFERENCES model(id),
  FOREIGN KEY (color_id)   REFERENCES color(id),
  FOREIGN KEY (quality_id) REFERENCES quality(id),
  FOREIGN KEY (storage_id) REFERENCES storage(id),
  FOREIGN KEY (seller_id)  REFERENCES seller(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_images (
  pr_id  INT          NOT NULL,
  images VARCHAR(255),
  FOREIGN KEY (pr_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS stock (
  id          INT    NOT NULL AUTO_INCREMENT,
  product_id  INT,
  price       DOUBLE NOT NULL,
  qty         INT    NOT NULL,
  discount_id INT,
  status_id   INT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)  REFERENCES product(id),
  FOREIGN KEY (discount_id) REFERENCES discount(id),
  FOREIGN KEY (status_id)   REFERENCES status(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
  id          INT    NOT NULL AUTO_INCREMENT,
  user_id     INT,
  status_id   INT,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)   REFERENCES users(id),
  FOREIGN KEY (status_id) REFERENCES status(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS order_item (
  id         INT    NOT NULL AUTO_INCREMENT,
  order_id   INT,
  stock_id   INT,
  qty        INT    NOT NULL,
  price      DOUBLE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (stock_id) REFERENCES stock(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cart (
  id         INT    NOT NULL AUTO_INCREMENT,
  user_id    INT,
  stock_id   INT,
  qty        INT    NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)  REFERENCES users(id),
  FOREIGN KEY (stock_id) REFERENCES stock(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS delivery (
  id               INT    NOT NULL AUTO_INCREMENT,
  order_id         INT,
  address_id       INT,
  delivery_type_id INT,
  status_id        INT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id)         REFERENCES orders(id),
  FOREIGN KEY (address_id)       REFERENCES address(id),
  FOREIGN KEY (delivery_type_id) REFERENCES delivery_types(id),
  FOREIGN KEY (status_id)        REFERENCES status(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SELECT 'All tables created!' AS result;
