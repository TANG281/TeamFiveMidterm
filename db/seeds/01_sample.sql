-- Users table seeds here (Example)
INSERT INTO users (name, email, password, phone_number)
VALUES ('Alice', '1@email.com', '123', 987654321);
INSERT INTO users (name, email, password, phone_number, is_admin)
VALUES ('Kira', '2@email.com', '345', 123456789, TRUE);

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'title', 'description', 150, './planning/images/sample.png', 'Phones', NOW());
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'title', 'description', 75, './planning/images/sample.png', 'Laptops', NOW());
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'title', 'description', 500, './planning/images/sample.png', 'Mini PCs', NOW());
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'title', 'description', 600, './planning/images/sample.png', 'Desktops', NOW());
