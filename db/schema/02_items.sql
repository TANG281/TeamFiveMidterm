-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  images_url VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);
