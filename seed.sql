-- ============================================================
--  NeonGear Gaming Store — Database Seed
--  Run this AFTER the Java app has started once so Hibernate
--  creates all tables via hbm2ddl.auto=update.
-- ============================================================
USE neongear;

-- ─── STATUS (field: value) ───────────────────────────────────
INSERT IGNORE INTO status (id, value) VALUES
  (1,  'ACTIVE'),
  (2,  'INACTIVE'),
  (3,  'PENDING'),
  (4,  'BLOCKED'),
  (5,  'DELIVERED'),
  (6,  'PACKING'),
  (7,  'APPROVED'),
  (8,  'REJECTED'),
  (9,  'CANCELED'),
  (10, 'VERIFIED'),
  (11, 'RECEIVED'),
  (12, 'COMPLETED');

-- ─── CITIES ──────────────────────────────────────────────────
INSERT IGNORE INTO city (id, name) VALUES
  (1, 'Colombo'),
  (2, 'Kandy'),
  (3, 'Galle'),
  (4, 'Negombo'),
  (5, 'Jaffna'),
  (6, 'Matara'),
  (7, 'Kurunegala'),
  (8, 'Anuradhapura'),
  (9, 'Ratnapura'),
  (10,'Badulla');

-- ─── DELIVERY TYPES ──────────────────────────────────────────
INSERT IGNORE INTO delivery_types (id, name, price) VALUES
  (1, 'Standard Delivery',  5.00),
  (2, 'Express Delivery',   12.00),
  (3, 'Same-Day Delivery',  25.00);

-- ─── BRANDS ──────────────────────────────────────────────────
INSERT IGNORE INTO brand (id, name) VALUES
  (1,  'NVIDIA'),
  (2,  'AMD'),
  (3,  'Intel'),
  (4,  'ASUS'),
  (5,  'MSI'),
  (6,  'Gigabyte'),
  (7,  'Corsair'),
  (8,  'Kingston'),
  (9,  'Samsung'),
  (10, 'Seagate'),
  (11, 'Razer'),
  (12, 'Logitech');

-- ─── MODELS ──────────────────────────────────────────────────
INSERT IGNORE INTO model (id, name, brand_id) VALUES
  (1,  'GeForce RTX 4090',        1),
  (2,  'GeForce RTX 4080 Super',  1),
  (3,  'GeForce RTX 4070 Ti',     1),
  (4,  'GeForce RTX 3080',        1),
  (5,  'Radeon RX 7900 XTX',      2),
  (6,  'Radeon RX 7800 XT',       2),
  (7,  'Radeon RX 6700 XT',       2),
  (8,  'Core i9-14900K',          3),
  (9,  'Core i7-14700K',          3),
  (10, 'Core i5-14600K',          3),
  (11, 'Ryzen 9 7950X',           2),
  (12, 'Ryzen 9 7900X',           2),
  (13, 'Ryzen 7 7700X',           2),
  (14, 'Ryzen 5 7600X',           2),
  (15, 'ROG STRIX Z790-E',        4),
  (16, 'MAG Z790 TOMAHAWK',       5),
  (17, 'AORUS X670E MASTER',      6),
  (18, 'ROG CROSSHAIR X670E',     4),
  (19, 'Vengeance DDR5-6000',     7),
  (20, 'FURY Beast DDR5-5200',    8),
  (21, 'Trident Z5 DDR5-6400',    5),
  (22, '990 Pro NVMe',            9),
  (23, 'Barracuda PCIe 4.0',      10),
  (24, 'MP600 Pro LPX',           7),
  (25, 'BlackWidow V4 Pro',       11),
  (26, 'DeathAdder V3 Pro',       11),
  (27, 'G Pro X Superlight 2',    12),
  (28, 'G915 TKL Lightspeed',     12);

-- ─── COLORS (field: value = hex code) ────────────────────────
INSERT IGNORE INTO color (id, value) VALUES
  (1, '#1a1a1a'),
  (2, '#f0f0f0'),
  (3, '#c0c0c0'),
  (4, '#00ff88'),
  (5, '#2a2a35');

-- ─── QUALITY (field: value) ──────────────────────────────────
INSERT IGNORE INTO quality (id, value) VALUES
  (1, 'Brand New'),
  (2, 'Open Box'),
  (3, 'Refurbished');

-- ─── STORAGE (field: value = capacity label) ─────────────────
INSERT IGNORE INTO storage (id, value) VALUES
  (1, '24 GB'),
  (2, '16 GB'),
  (3, '12 GB'),
  (4, '8 GB'),
  (5, '1 TB'),
  (6, '2 TB'),
  (7, 'N/A');

-- ─── DISCOUNTS ───────────────────────────────────────────────
INSERT IGNORE INTO discount (id, coupon_code, value, started_at, expired_at) VALUES
  (1, 'DEFAULT',   0.00,  '2025-01-01', '2030-12-31'),
  (2, 'SAVE5',     5.00,  '2025-01-01', '2030-12-31'),
  (3, 'SAVE10',   10.00,  '2025-01-01', '2030-12-31'),
  (4, 'SAVE15',   15.00,  '2025-01-01', '2030-12-31'),
  (5, 'SAVE20',   20.00,  '2025-01-01', '2030-12-31'),
  (6, 'MEGA30',   30.00,  '2025-01-01', '2030-12-31');

-- ─── SELLER USER (NeonGear store account) ────────────────────
INSERT IGNORE INTO users (id, first_name, last_name, email, password, verification_code, status_id, created_at, updated_at)
  VALUES (1, 'NeonGear', 'Store', 'store@neongear.gg', 'admin123', '000000', 1, NOW(), NOW());

INSERT IGNORE INTO seller (id, company_name, company_mobile, company_email, status_id, user_id, created_at, updated_at)
  VALUES (1, 'NeonGear Gaming Components', '0112345678', 'store@neongear.gg', 1, 1, NOW(), NOW());

-- ─── PRODUCTS ────────────────────────────────────────────────
INSERT IGNORE INTO product (id, title, description, model_id, color_id, quality_id, storage_id, seller_id, created_at, updated_at) VALUES

(1, 'NVIDIA GeForce RTX 4090 24GB',
 '<h4>The Ultimate Gaming GPU</h4><p>The GeForce RTX 4090 is the world\'s most powerful gaming GPU. 16,384 CUDA cores, 24 GB GDDR6X, Ada Lovelace architecture — unstoppable 4K gaming performance.</p><ul><li>24 GB GDDR6X Memory</li><li>16384 CUDA Cores</li><li>Ada Lovelace Architecture</li><li>DLSS 3 Support</li><li>PCIe 4.0</li></ul>',
 1, 1, 1, 1, 1, NOW(), NOW()),

(2, 'NVIDIA GeForce RTX 4080 Super 16GB',
 '<h4>Next-Level 4K Performance</h4><p>RTX 4080 Super delivers incredible 4K gaming with 10,240 CUDA cores and 16 GB GDDR6X. DLSS 3 multiplies frame rates using AI.</p><ul><li>16 GB GDDR6X Memory</li><li>10240 CUDA Cores</li><li>DLSS 3 Frame Generation</li><li>Full Ray Tracing</li></ul>',
 2, 4, 1, 2, 1, NOW(), NOW()),

(3, 'NVIDIA GeForce RTX 4070 Ti 12GB',
 '<h4>1440p & 4K Gaming Excellence</h4><p>RTX 4070 Ti is built for high-refresh 1440p and smooth 4K. DLSS 3 and full ray tracing make every game look stunning.</p><ul><li>12 GB GDDR6X</li><li>7680 CUDA Cores</li><li>DLSS 3 Support</li></ul>',
 3, 1, 1, 3, 1, NOW(), NOW()),

(4, 'AMD Radeon RX 7900 XTX 24GB',
 '<h4>AMD\'s Flagship Graphics Card</h4><p>RX 7900 XTX packs 24 GB GDDR6 with AMD RDNA 3. FSR 3 and Fluid Motion Frames push performance to new levels.</p><ul><li>24 GB GDDR6 Memory</li><li>RDNA 3 Architecture</li><li>FSR 3.0 Support</li><li>DisplayPort 2.1</li></ul>',
 5, 1, 1, 1, 1, NOW(), NOW()),

(5, 'AMD Radeon RX 7800 XT 16GB',
 '<h4>Excellent 1440p Performance</h4><p>RX 7800 XT offers exceptional 1440p gaming with 16 GB GDDR6. RDNA 3 architecture and Radeon Anti-Lag+ for ultra-responsive gameplay.</p><ul><li>16 GB GDDR6 Memory</li><li>RDNA 3 Architecture</li><li>Radeon Anti-Lag+</li></ul>',
 6, 4, 1, 2, 1, NOW(), NOW()),

(6, 'Intel Core i9-14900K Processor',
 '<h4>Intel\'s Fastest Desktop CPU</h4><p>Core i9-14900K features 24 cores (8P+16E) and up to 6.0 GHz boost. Perfect for gaming while streaming and content creation simultaneously.</p><ul><li>24 Cores / 32 Threads</li><li>Up to 6.0 GHz Boost</li><li>LGA1700 Socket</li><li>Z790 / Z690 Compatible</li></ul>',
 8, 3, 1, 7, 1, NOW(), NOW()),

(7, 'Intel Core i7-14700K Processor',
 '<h4>High-Performance Gaming CPU</h4><p>Core i7-14700K delivers 20 cores and up to 5.6 GHz boost — a powerhouse for gaming and multitasking at a great price.</p><ul><li>20 Cores / 28 Threads</li><li>Up to 5.6 GHz Boost</li><li>LGA1700 Socket</li></ul>',
 9, 3, 1, 7, 1, NOW(), NOW()),

(8, 'AMD Ryzen 9 7950X Processor',
 '<h4>AMD\'s Ultimate 16-Core Beast</h4><p>Ryzen 9 7950X — 16 cores, 32 threads, 5.7 GHz boost on Zen 4 architecture with PCIe 5.0 support. No compromises.</p><ul><li>16 Cores / 32 Threads</li><li>Up to 5.7 GHz Boost</li><li>AM5 Socket</li><li>PCIe 5.0</li></ul>',
 11, 3, 1, 7, 1, NOW(), NOW()),

(9, 'AMD Ryzen 7 7700X Processor',
 '<h4>8-Core Gaming Powerhouse</h4><p>Ryzen 7 7700X — 8 cores, 5.4 GHz boost, excellent single-core gaming performance. Great value for the AM5 platform.</p><ul><li>8 Cores / 16 Threads</li><li>Up to 5.4 GHz Boost</li><li>AM5 Socket</li></ul>',
 13, 3, 1, 7, 1, NOW(), NOW()),

(10, 'ASUS ROG STRIX Z790-E Gaming WiFi',
 '<h4>Premium Intel Z790 Motherboard</h4><p>20-stage power delivery, DDR5 up to 7800 MHz, USB4 Gen 2x2, dual M.2 slots. RGB Aura Sync and Wi-Fi 6E.</p><ul><li>Intel LGA1700 Socket</li><li>DDR5-7800+ OC</li><li>Wi-Fi 6E + BT 5.3</li><li>PCIe 5.0 x16</li></ul>',
 15, 1, 1, 7, 1, NOW(), NOW()),

(11, 'MSI MAG Z790 TOMAHAWK WiFi',
 '<h4>Rock-Solid Intel Build</h4><p>16+1+1 phase power design, DDR5 up to 7200 MHz, EZ Debug LEDs. Perfect for overclocking builds.</p><ul><li>Intel LGA1700 Socket</li><li>DDR5-7200+ OC</li><li>2.5G LAN + Wi-Fi 6E</li></ul>',
 16, 1, 1, 7, 1, NOW(), NOW()),

(12, 'Gigabyte AORUS X670E Master',
 '<h4>Top-Tier AM5 Motherboard</h4><p>18+2+2 power stages, DDR5-6600+, PCIe 5.0 for GPU and M.2, Thunderbolt 4. The ultimate AM5 foundation.</p><ul><li>AMD AM5 Socket</li><li>DDR5-6600+ Support</li><li>Wi-Fi 6E + Thunderbolt 4</li><li>PCIe 5.0 M.2</li></ul>',
 17, 1, 1, 7, 1, NOW(), NOW()),

(13, 'Corsair Vengeance DDR5-6000 32GB Kit',
 '<h4>High-Speed DDR5 Gaming RAM</h4><p>6000 MHz with XMP 3.0. Low-profile heatspreader fits large CPU coolers. 32 GB kit (2x16 GB).</p><ul><li>32 GB (2x16 GB)</li><li>DDR5-6000 MHz</li><li>CL36 Latency</li><li>XMP 3.0</li></ul>',
 19, 1, 1, 2, 1, NOW(), NOW()),

(14, 'Kingston FURY Beast DDR5-5200 32GB Kit',
 '<h4>Aggressive DDR5 Performance</h4><p>5200 MHz with Plug N Play auto-overclock. Low-profile design for maximum compatibility. 32 GB kit (2x16 GB).</p><ul><li>32 GB (2x16 GB)</li><li>DDR5-5200 MHz</li><li>XMP 3.0 Ready</li></ul>',
 20, 4, 1, 2, 1, NOW(), NOW()),

(15, 'Samsung 990 Pro NVMe SSD 2TB',
 '<h4>World\'s Fastest Consumer SSD</h4><p>Up to 7,450 MB/s sequential reads with PCIe 4.0. Smart Thermal Guard and Samsung Magician Software included.</p><ul><li>PCIe 4.0 x4 NVMe</li><li>7450 MB/s Read</li><li>6900 MB/s Write</li><li>Samsung Magician</li></ul>',
 22, 3, 1, 6, 1, NOW(), NOW()),

(16, 'Seagate Barracuda PCIe 4.0 SSD 1TB',
 '<h4>Fast & Reliable NVMe Storage</h4><p>7300 MB/s reads at an excellent price. Five-year warranty and Seagate\'s legendary reliability.</p><ul><li>PCIe 4.0 x4 NVMe</li><li>7300 MB/s Read</li><li>5-Year Warranty</li></ul>',
 23, 3, 1, 5, 1, NOW(), NOW()),

(17, 'Razer BlackWidow V4 Pro Mechanical Keyboard',
 '<h4>Ultimate Gaming Keyboard</h4><p>Razer Yellow linear switches, 1.2mm actuation. Per-key RGB Chroma, USB passthrough, wrist rest included.</p><ul><li>Razer Yellow Linear Switches</li><li>Per-Key RGB Chroma</li><li>USB Passthrough</li><li>Wrist Rest Included</li></ul>',
 25, 1, 1, 7, 1, NOW(), NOW()),

(18, 'Razer DeathAdder V3 Pro Gaming Mouse',
 '<h4>Iconic Ergonomic Gaming Mouse</h4><p>63g ultralight with Razer Focus Pro 30K sensor. HyperSpeed wireless, 90-hour battery life.</p><ul><li>Focus Pro 30K Sensor</li><li>63g Ultralight</li><li>HyperSpeed Wireless</li><li>90-Hour Battery</li></ul>',
 26, 1, 1, 7, 1, NOW(), NOW()),

(19, 'Logitech G Pro X Superlight 2 Mouse',
 '<h4>Pro Esports Wireless Mouse</h4><p>60g with HERO 2 25K sensor. Used by top esports professionals. LIGHTSPEED wireless with 95-hour battery.</p><ul><li>HERO 2 25K Sensor</li><li>60g Ultralight</li><li>LIGHTSPEED Wireless</li><li>95-Hour Battery</li></ul>',
 27, 2, 1, 7, 1, NOW(), NOW()),

(20, 'Logitech G915 TKL Lightspeed Keyboard',
 '<h4>Low-Profile Wireless Gaming Keyboard</h4><p>Ultra-thin GL mechanical switches, LIGHTSPEED wireless, 40-hour battery, per-key RGB LIGHTSYNC.</p><ul><li>GL Tactile Low-Profile Switches</li><li>LIGHTSPEED Wireless</li><li>40-Hour Battery</li><li>Per-Key RGB</li></ul>',
 28, 3, 1, 7, 1, NOW(), NOW());

-- ─── PRODUCT IMAGES ──────────────────────────────────────────
INSERT IGNORE INTO product_images (pr_id, images) VALUES
  (1,  'assets/images/product/product-01.png'),
  (1,  'assets/images/product/product-02.png'),
  (1,  'assets/images/product/product-03.png'),
  (2,  'assets/images/product/product-01.png'),
  (2,  'assets/images/product/product-02.png'),
  (3,  'assets/images/product/product-01.png'),
  (3,  'assets/images/product/product-02.png'),
  (4,  'assets/images/product/product-02.png'),
  (4,  'assets/images/product/product-01.png'),
  (5,  'assets/images/product/product-01.png'),
  (5,  'assets/images/product/product-03.png'),
  (6,  'assets/images/product/product-02.png'),
  (6,  'assets/images/product/product-01.png'),
  (7,  'assets/images/product/product-01.png'),
  (7,  'assets/images/product/product-02.png'),
  (8,  'assets/images/product/product-02.png'),
  (8,  'assets/images/product/product-03.png'),
  (9,  'assets/images/product/product-01.png'),
  (9,  'assets/images/product/product-02.png'),
  (10, 'assets/images/product/product-03.png'),
  (10, 'assets/images/product/product-01.png'),
  (11, 'assets/images/product/product-01.png'),
  (11, 'assets/images/product/product-02.png'),
  (12, 'assets/images/product/product-02.png'),
  (12, 'assets/images/product/product-03.png'),
  (13, 'assets/images/product/product-01.png'),
  (13, 'assets/images/product/product-02.png'),
  (14, 'assets/images/product/product-03.png'),
  (14, 'assets/images/product/product-01.png'),
  (15, 'assets/images/product/product-02.png'),
  (15, 'assets/images/product/product-01.png'),
  (16, 'assets/images/product/product-01.png'),
  (16, 'assets/images/product/product-03.png'),
  (17, 'assets/images/product/product-02.png'),
  (17, 'assets/images/product/product-01.png'),
  (18, 'assets/images/product/product-01.png'),
  (18, 'assets/images/product/product-02.png'),
  (19, 'assets/images/product/product-02.png'),
  (19, 'assets/images/product/product-03.png'),
  (20, 'assets/images/product/product-01.png'),
  (20, 'assets/images/product/product-02.png');

-- ─── STOCK ───────────────────────────────────────────────────
INSERT IGNORE INTO stock (id, product_id, price, qty, discount_id, status_id, created_at, updated_at) VALUES
  (1,  1,  1599.99, 8,  1, 1, NOW(), NOW()),
  (2,  2,  999.99,  12, 2, 1, NOW(), NOW()),
  (3,  3,  799.99,  15, 1, 1, NOW(), NOW()),
  (4,  4,  999.99,  10, 3, 1, NOW(), NOW()),
  (5,  5,  499.99,  18, 4, 1, NOW(), NOW()),
  (6,  6,  549.99,  20, 1, 1, NOW(), NOW()),
  (7,  7,  399.99,  25, 2, 1, NOW(), NOW()),
  (8,  8,  699.99,  15, 3, 1, NOW(), NOW()),
  (9,  9,  349.99,  22, 1, 1, NOW(), NOW()),
  (10, 10, 499.99,  10, 1, 1, NOW(), NOW()),
  (11, 11, 299.99,  18, 2, 1, NOW(), NOW()),
  (12, 12, 449.99,  12, 1, 1, NOW(), NOW()),
  (13, 13, 189.99,  30, 4, 1, NOW(), NOW()),
  (14, 14, 149.99,  35, 3, 1, NOW(), NOW()),
  (15, 15, 179.99,  25, 5, 1, NOW(), NOW()),
  (16, 16, 99.99,   40, 3, 1, NOW(), NOW()),
  (17, 17, 229.99,  20, 2, 1, NOW(), NOW()),
  (18, 18, 159.99,  28, 1, 1, NOW(), NOW()),
  (19, 19, 159.99,  22, 2, 1, NOW(), NOW()),
  (20, 20, 219.99,  16, 1, 1, NOW(), NOW());

SELECT 'Seed complete!' AS result;
SELECT COUNT(*) AS products FROM product;
SELECT COUNT(*) AS stock_items FROM stock;
SELECT COUNT(*) AS brands FROM brand;
