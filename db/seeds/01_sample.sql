-- Users table seeds here (Example)
INSERT INTO users (name, email, password, phone_number)
VALUES ('Alice', '1@email.com', '123', 123456789);
INSERT INTO users (name, email, password, phone_number, is_admin)
VALUES ('Kira', '2@email.com', '345', 987654321, TRUE);

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'title', 'description', 150, './planning/images/sample.png', 'Phones', 1692370970);
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'title', 'description', 75, './planning/images/sample.png', 'Laptops', 1692370970);
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'title', 'description', 500, './planning/images/sample.png', 'Mini PCs', 1692370970);
INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'title', 'description', 600, './planning/images/sample.png', 'Desktops', 1692370970);
