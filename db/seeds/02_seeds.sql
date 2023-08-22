INSERT INTO users (name, email, password, phone_number)
VALUES ('Tuan', 'Tuan@email.com', '123', 1234567890);
INSERT INTO users (name, email, password, phone_number, is_admin)
VALUES ('Rora', 'rora@email.com', '456', 0987654321, TRUE);
INSERT INTO users (name, email, password, phone_number)
VALUES ('Jerryl', 'jerryl@email.com', '789', 1238904567);
INSERT INTO users (name, email, password, phone_number)
VALUES ('Afreeda', 'afreeda@email.com', '743', 1234834567);
INSERT iNTO users (name, email, password, phone_number)
VALUES ('Afish', 'afish@email.com', '786', 1234844577);

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'iPhone 14 Pro Max', 'Up for sale is a pristine iPhone 14 Pro Max, a pinnacle of technology and elegance. Its expansive 6.7-inch Super Retina XDR display brings visuals to life, powered by the blazing A16 Bionic chip for seamless performance. Capture life''s moments with precision using the triple-lens Pro camera system, including ultra-wide, wide, and telephoto lenses. With 5G capabilities, experience lightning-fast connectivity. The sleek design features a ceramic shield front and stainless-steel frame. This unlocked device offers convenience and security with Face ID. Immaculately maintained, it comes with original accessories. Elevate your mobile experience with this exceptional iPhone 14 Pro Max.', 1000, './planning/images/phone1.png', 'phones', NOW());

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'Samsung Galaxy S21', 'Offering a premium experience, the Samsung Galaxy S21 is a true marvel of technology. With its stunning 6.2-inch Dynamic AMOLED 2X display, you''ll enjoy vibrant colors and crisp visuals. Powered by a blazing-fast Exynos 2100 processor, this smartphone ensures seamless multitasking and smooth performance. Capture life''s moments in stunning detail with the triple-lens camera system, including a 12MP main, 12MP ultra-wide, and 64MP telephoto lens. Enjoy the convenience of 5G connectivity and a sleek, glass-and-metal design. The device is unlocked and ready for use. Elevate your mobile experience with the Samsung Galaxy S21.', 925, './planning/images/phone2.png', 'phones', NOW());

INSERT INTO items (owner_id, title, description, price, is_available, images_url, category, date_posted)
VALUES (3, 'Google Pixel 4', 'Experience the power of Google''s innovation with the Google Pixel 4. This flagship smartphone boasts a 5.7-inch OLED display with smooth 90Hz refresh rate, delivering vibrant visuals and responsive touch. Capture stunning photos with the advanced dual-camera system, featuring a 12.2MP main sensor and 16MP telephoto lens. The Pixel 4 excels in low-light photography with Night Sight mode. Powered by a Snapdragon 855 processor and 6GB RAM, it ensures snappy performance. Enjoy the seamless integration of Android with regular updates directly from Google. With its sleek design, impressive camera capabilities, and pure Android experience, the Pixel 4 is a true gem.', 985, FALSE, './planning/images/phone3.png', 'phones', NOW());





INSERT INTO items (owner_id, title, description, price, is_available, images_url, category, date_posted)
VALUES (2, 'Dell Inspiron 27 All-in-One Desktop', 'Elevate your computing experience with the Dell Inspiron 27 All-in-One Desktop. Its 27-inch InfinityEdge touchscreen display showcases stunning visuals, while the Intel Core i7 processor and 16GB of RAM ensure smooth multitasking. The 512GB SSD offers ample storage and quick boot times. Featuring a sleek design, this desktop combines power and elegance. Built-in Wi-Fi, USB-C, and HDMI ports provide versatile connectivity. Perfect for work, creativity, and entertainment.', 1300, FALSE, './planning/images/desktop1.png', 'desktops', NOW());

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'HP Envy Tower Desktop', 'Unleash your productivity with the HP Envy Tower Desktop. Equipped with an AMD Ryzen 7 processor and 12GB RAM, this desktop handles demanding tasks effortlessly. The 1TB HDD and 256GB SSD provide a balance of storage and speed. With NVIDIA GeForce graphics, it''s ideal for both work and gaming. The sleek tower design complements any workspace, and ample USB ports and Bluetooth offer easy connectivity. Elevate your computing setup with the HP Envy Tower Desktop.', 950, './planning/images/desktop2.png', 'desktops', NOW());

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (3, 'Acer Predator Orion Gaming Desktop', 'Dominate the gaming arena with the Acer Predator Orion Gaming Desktop. Powered by an Intel Core i9 processor and 32GB RAM, this desktop delivers exceptional performance for intense gaming sessions. The 1TB SSD ensures rapid loading times, while the NVIDIA GeForce RTX graphics card offers stunning visuals. Customizable RGB lighting and a transparent side panel showcase your setup. Stay connected with multiple USB ports and Wi-Fi 6 support. Unleash your gaming prowess with the Acer Predator Orion Gaming Desktop.', 2400, './planning/images/desktop3.png', 'desktops', NOW());





INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (3, 'HP Spectre x360 Convertible Laptop', 'Unleash your creativity and productivity with the HP Spectre x360. Its 11th Gen Intel Core i7 processor and 16GB RAM provide exceptional performance for demanding tasks. The 13.3-inch OLED touchscreen display offers stunning visuals, and the 512GB SSD ensures fast and reliable storage. With its 2-in-1 design, this laptop transforms into a tablet for versatility. Backlit keyboard, Windows Hello, and Thunderbolt 4 support enhance functionality. Experience premium design and innovative features with the HP Spectre x360.', 1300, './planning/images/laptop1.png', 'laptops', NOW());

INSERT INTO items (owner_id, title, description, price, is_available, images_url, category, date_posted)
VALUES (1, 'ASUS ZenBook 14 Ultra-Slim Laptop', 'Experience the perfect blend of style and performance with the ASUS ZenBook 14. Powered by an AMD Ryzen 7 processor and 16GB RAM, it delivers seamless multitasking and efficient computing. The 14-inch Full HD display offers vivid visuals, and the 512GB SSD ensures fast storage. With its ultra-slim profile and lightweight design, this laptop is a portable powerhouse. Backlit keyboard, Windows Hello, and comprehensive connectivity options make it a versatile choice. Elevate your computing experience with the ASUS ZenBook 14.', 1100, FALSE, './planning/images/laptop2.png', 'laptops', NOW());

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (2, 'Lenovo IdeaPad 3 Budget Laptop', 'Discover reliable computing at an affordable price with the Lenovo IdeaPad 3. Featuring an AMD Ryzen 5 processor and 8GB RAM, this budget-friendly laptop handles everyday tasks with ease. The 15.6-inch HD display offers clear visuals, and the 256GB SSD provides fast storage. With its lightweight design, it''s perfect for on-the-go productivity. Windows 10 Home, comprehensive connectivity options, and a comfortable keyboard enhance the user experience. Elevate your efficiency without breaking the bank with the Lenovo IdeaPad 3.', 600, './planning/images/laptop3.png', 'laptops', NOW());





INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'Intel NUC 10 Performance Mini PC', 'Unleash powerful computing in a compact form with the Intel NUC 10 Performance Mini PC. Equipped with a 10th Gen Intel Core i5 processor and 8GB RAM, this mini PC delivers impressive performance for multitasking and entertainment. The sleek chassis houses a 256GB SSD for fast storage and quick boot times. Featuring USB-C, HDMI, and Wi-Fi 6 support, it offers versatile connectivity options. Whether for work or play, the Intel NUC 10 Performance Mini PC packs a punch in a small package.', 700, './planning/images/mini1.png', 'miniPCs', NOW());

INSERT INTO items (owner_id, title, description, price, images_url, category, date_posted)
VALUES (1, 'ASUS PN50 Barebone Mini PC', 'Create a personalized computing solution with the ASUS PN50 Barebone Mini PC. Designed for flexibility, this mini PC features an AMD Ryzen 5 processor and supports up to 64GB RAM and an M.2 SSD. The compact yet expandable design makes it ideal for various tasks, from productivity to entertainment. Multiple USB ports, HDMI, and DisplayPort ensure comprehensive connectivity. Customize your performance and storage with the ASUS PN50 Barebone Mini PC and experience powerful computing in a small footprint.', 400, './planning/images/mini2.png', 'miniPCs', NOW());

INSERT INTO items (owner_id, title, description, price, is_available, images_url, category, date_posted)
VALUES (2, 'MSI Cubi N Compact Mini PC', 'Experience efficient computing without compromising space with the MSI Cubi N Compact Mini PC. Powered by an Intel Celeron processor and 4GB RAM, this mini PC offers reliable performance for everyday tasks. The compact design makes it a perfect fit for tight spaces, while the 128GB SSD provides speedy storage. With USB and HDMI ports, it offers essential connectivity. Whether for home or office use, the MSI Cubi N Compact Mini PC is your solution for compact and capable computing.', 250, FALSE, './planning/images/mini3.png', 'miniPCs', NOW());
