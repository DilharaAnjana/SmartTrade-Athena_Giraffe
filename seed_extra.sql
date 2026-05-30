-- ============================================================
--  NeonGear — Extra Products (adds 30 more items, totaling 50)
-- ============================================================
USE neongear;

-- ─── More Brands ─────────────────────────────────────────────
INSERT IGNORE INTO brand (id, name) VALUES
  (13, 'NZXT'),
  (14, 'be quiet!'),
  (15, 'Cooler Master'),
  (16, 'Lian Li'),
  (17, 'SteelSeries'),
  (18, 'HyperX'),
  (19, 'Western Digital'),
  (20, 'Crucial');

-- ─── More Models ─────────────────────────────────────────────
INSERT IGNORE INTO model (id, name, brand_id) VALUES
  -- GPUs more
  (29, 'GeForce RTX 4060 Ti',    1),
  (30, 'Radeon RX 6600 XT',      2),
  -- CPUs more
  (31, 'Core i5-13600KF',        3),
  (32, 'Ryzen 5 5600X',          2),
  -- Motherboard more
  (33, 'PRIME B760-PLUS',        4),
  (34, 'B650 STEEL LEGEND',      4),
  -- RAM more
  (35, 'Crucial Pro DDR5-5600',  20),
  (36, 'HyperX Fury DDR4-3200',  18),
  -- SSD/Storage
  (37, 'WD Black SN850X',        19),
  (38, 'Crucial T700',           20),
  (39, 'Samsung 870 EVO SATA',   9),
  -- Cooling
  (40, 'Kraken X73',             13),
  (41, 'Dark Rock Pro 4',        14),
  (42, 'Hyper 212 Black',        15),
  (43, 'NF-A12x25 PWM',          14),
  -- Cases
  (44, 'H7 Flow',                13),
  (45, 'Lancool III',            16),
  (46, 'NR200P',                 15),
  (47, 'O11 Dynamic EVO',        16),
  -- PSU
  (48, 'RM850e',                  7),
  (49, 'MWE Gold 750 V2',        15),
  (50, 'Straight Power 11',      14),
  -- Headsets
  (51, 'Arctis Nova Pro',        17),
  (52, 'Cloud III',              18),
  (53, 'BlackShark V2 Pro',      11),
  -- Monitors
  (54, 'ROG Swift PG279QM',       4),
  (55, 'Odyssey G7',              9),
  (56, 'AOC 24G2',                5),
  -- Webcams / Streaming gear
  (57, 'Brio 4K',                12),
  (58, 'StreamCam',              12);

-- ─── New Colors ──────────────────────────────────────────────
INSERT IGNORE INTO color (id, value) VALUES
  (6, '#ff3b9a'),
  (7, '#8b5cf6'),
  (8, '#00d4ff');

-- ─── More Storage values ─────────────────────────────────────
INSERT IGNORE INTO storage (id, value) VALUES
  (8, '32 GB'),
  (9, '64 GB'),
  (10, '4 TB'),
  (11, '500 GB'),
  (12, '27-inch'),
  (13, '32-inch');

-- ─── EXTRA PRODUCTS (ids 21–50) ──────────────────────────────
INSERT IGNORE INTO product (id, title, description, model_id, color_id, quality_id, storage_id, seller_id, created_at, updated_at) VALUES

(21, 'NVIDIA GeForce RTX 4060 Ti 8GB',
 '<h4>Affordable 1080p/1440p Powerhouse</h4><p>RTX 4060 Ti with 8 GB GDDR6 delivers excellent 1080p and capable 1440p gaming. DLSS 3 and AV1 encoding included.</p><ul><li>8 GB GDDR6 Memory</li><li>4352 CUDA Cores</li><li>DLSS 3 Frame Generation</li><li>AV1 Encoding</li></ul>',
 29, 1, 1, 4, 1, NOW(), NOW()),

(22, 'AMD Radeon RX 6600 XT 8GB',
 '<h4>Sweet-Spot 1080p Gaming Card</h4><p>RX 6600 XT delivers 100+ fps in modern games at 1080p Ultra. RDNA 2 efficiency with low power draw.</p><ul><li>8 GB GDDR6 Memory</li><li>RDNA 2 Architecture</li><li>Infinity Cache 32 MB</li></ul>',
 30, 1, 1, 4, 1, NOW(), NOW()),

(23, 'Intel Core i5-13600KF Processor',
 '<h4>Best-Value Gaming CPU</h4><p>Core i5-13600KF with 14 cores (6P+8E) and 5.1 GHz boost. The smart choice for competitive 1440p gaming builds.</p><ul><li>14 Cores / 20 Threads</li><li>Up to 5.1 GHz Boost</li><li>LGA1700 Socket</li><li>No Integrated Graphics (KF)</li></ul>',
 31, 3, 1, 7, 1, NOW(), NOW()),

(24, 'AMD Ryzen 5 5600X Processor',
 '<h4>Reliable 6-Core AM4 CPU</h4><p>Ryzen 5 5600X — 6 cores, 4.6 GHz boost, Zen 3. A proven gaming workhorse with Wraith Stealth cooler included.</p><ul><li>6 Cores / 12 Threads</li><li>Up to 4.6 GHz Boost</li><li>AM4 Socket</li><li>Wraith Stealth Cooler Included</li></ul>',
 32, 3, 1, 7, 1, NOW(), NOW()),

(25, 'ASUS PRIME B760-PLUS D4 Motherboard',
 '<h4>Reliable Intel B760 Motherboard</h4><p>PRIME B760-PLUS supports DDR4-3200 and 13th/14th Gen Core CPUs. Robust VRM and PCIe 4.0 M.2 slot.</p><ul><li>Intel LGA1700</li><li>DDR4-3200 Support</li><li>PCIe 4.0 M.2</li><li>2.5G LAN</li></ul>',
 33, 1, 1, 7, 1, NOW(), NOW()),

(26, 'ASRock B650 Steel Legend WiFi',
 '<h4>Stylish AM5 Motherboard</h4><p>B650 Steel Legend supports DDR5-6400+, Wi-Fi 6E, and PCIe 5.0 M.2. Reinforced PCIe slot and beautiful camo finish.</p><ul><li>AMD AM5</li><li>DDR5-6400+</li><li>Wi-Fi 6E</li><li>PCIe 5.0 M.2</li></ul>',
 34, 5, 1, 7, 1, NOW(), NOW()),

(27, 'Crucial Pro DDR5-5600 32GB Kit',
 '<h4>Reliable DDR5 Performance</h4><p>Crucial Pro 32 GB (2x16 GB) DDR5-5600 with Micron silicon. Plug-and-play XMP/EXPO profile for instant performance.</p><ul><li>32 GB (2x16 GB)</li><li>DDR5-5600 MHz</li><li>XMP 3.0 / EXPO</li></ul>',
 35, 1, 1, 8, 1, NOW(), NOW()),

(28, 'HyperX Fury DDR4-3200 16GB Kit',
 '<h4>Reliable DDR4 Gaming RAM</h4><p>HyperX Fury 16 GB (2x8 GB) DDR4-3200 — perfect for AM4 and LGA1200 systems on a budget.</p><ul><li>16 GB (2x8 GB)</li><li>DDR4-3200 MHz</li><li>CL16 Latency</li></ul>',
 36, 1, 1, 2, 1, NOW(), NOW()),

(29, 'WD Black SN850X NVMe SSD 1TB',
 '<h4>Pro Gaming NVMe SSD</h4><p>WD_BLACK SN850X delivers 7300 MB/s read speeds with Game Mode 2.0. Heatsink option available.</p><ul><li>PCIe 4.0 x4 NVMe</li><li>7300 MB/s Read</li><li>Game Mode 2.0</li><li>5-Year Warranty</li></ul>',
 37, 3, 1, 5, 1, NOW(), NOW()),

(30, 'Crucial T700 NVMe SSD 2TB',
 '<h4>PCIe 5.0 Flagship SSD</h4><p>Crucial T700 pushes 12400 MB/s sequential reads with PCIe Gen 5. The fastest consumer SSD on the market.</p><ul><li>PCIe 5.0 x4 NVMe</li><li>12400 MB/s Read</li><li>11800 MB/s Write</li></ul>',
 38, 3, 1, 6, 1, NOW(), NOW()),

(31, 'Samsung 870 EVO SATA SSD 1TB',
 '<h4>Reliable SATA SSD Upgrade</h4><p>Samsung 870 EVO 1 TB SATA SSD — the proven choice for laptop and desktop upgrades. 560 MB/s read speed.</p><ul><li>2.5\" SATA III</li><li>560 MB/s Read</li><li>5-Year Warranty</li></ul>',
 39, 3, 1, 5, 1, NOW(), NOW()),

(32, 'NZXT Kraken X73 360mm AIO Cooler',
 '<h4>RGB Liquid CPU Cooler</h4><p>Kraken X73 with 360mm radiator, three Aer P fans, and infinity-mirror RGB pump cap. Excellent thermal performance.</p><ul><li>360mm Radiator</li><li>Infinity-Mirror Display</li><li>RGB LED</li><li>6-Year Warranty</li></ul>',
 40, 1, 1, 7, 1, NOW(), NOW()),

(33, 'be quiet! Dark Rock Pro 4 Air Cooler',
 '<h4>Silent Premium Air Cooler</h4><p>Dark Rock Pro 4 — 250W TDP, dual-tower design, two Silent Wings 135mm fans. Whisper-quiet under full load.</p><ul><li>250W TDP</li><li>Dual-Tower Design</li><li>Silent Wings 135mm Fans</li><li>3-Year Warranty</li></ul>',
 41, 1, 1, 7, 1, NOW(), NOW()),

(34, 'Cooler Master Hyper 212 Black Edition',
 '<h4>Best-Selling Budget Air Cooler</h4><p>Hyper 212 Black — direct-contact heatpipes, SF120R fan, all-black finish. The proven budget cooling king.</p><ul><li>4 Direct-Contact Heatpipes</li><li>SF120R Fan Included</li><li>All-Black Anodized Finish</li></ul>',
 42, 1, 1, 7, 1, NOW(), NOW()),

(35, 'Noctua NF-A12x25 PWM 120mm Fan',
 '<h4>Award-Winning Premium Fan</h4><p>NF-A12x25 — Noctua\'s reference 120mm fan with AAO frame and SSO2 bearing. The gold standard for quiet cooling.</p><ul><li>120mm × 25mm</li><li>PWM 450-2000 RPM</li><li>SSO2 Bearing</li><li>6-Year Warranty</li></ul>',
 43, 5, 1, 7, 1, NOW(), NOW()),

(36, 'NZXT H7 Flow Mid-Tower Case',
 '<h4>High-Airflow ATX Case</h4><p>H7 Flow — perforated front panel for maximum airflow, two preinstalled fans, and clean cable management.</p><ul><li>ATX Mid-Tower</li><li>2× 120mm Fans Included</li><li>Tempered Glass Side</li><li>USB-C Front I/O</li></ul>',
 44, 1, 1, 7, 1, NOW(), NOW()),

(37, 'Lian Li Lancool III RGB Case',
 '<h4>Premium RGB Mid-Tower</h4><p>Lancool III — four pre-installed RGB fans, mesh front panel, dual chamber design. Easy to build in.</p><ul><li>ATX Mid-Tower</li><li>4× Pre-Installed RGB Fans</li><li>Dual Tempered Glass</li><li>Reversible Layout</li></ul>',
 45, 1, 1, 7, 1, NOW(), NOW()),

(38, 'Cooler Master NR200P Mini-ITX Case',
 '<h4>Best-In-Class SFF Case</h4><p>NR200P — 18.25L mini-ITX case with massive GPU clearance (330mm) and 280mm AIO support. The SFF community\'s favorite.</p><ul><li>Mini-ITX Form Factor</li><li>GPU up to 330mm</li><li>280mm AIO Support</li><li>Tempered Glass Variant</li></ul>',
 46, 2, 1, 7, 1, NOW(), NOW()),

(39, 'Lian Li O11 Dynamic EVO Case',
 '<h4>Iconic Dual-Chamber Case</h4><p>O11 Dynamic EVO — reversible chassis, modular front and top mesh, supports 420mm radiators. Premium build quality.</p><ul><li>E-ATX Compatible</li><li>Reversible Chassis</li><li>Up to 420mm Radiator</li><li>Triple Tempered Glass</li></ul>',
 47, 1, 1, 7, 1, NOW(), NOW()),

(40, 'Corsair RM850e 80+ Gold PSU',
 '<h4>Reliable 850W Gold PSU</h4><p>RM850e — fully modular, 80+ Gold efficiency, 105°C Japanese capacitors. Backed by a 7-year warranty.</p><ul><li>850W Continuous Power</li><li>80+ Gold Efficient</li><li>Fully Modular</li><li>7-Year Warranty</li></ul>',
 48, 1, 1, 7, 1, NOW(), NOW()),

(41, 'Cooler Master MWE Gold 750 V2',
 '<h4>Solid 80+ Gold 750W PSU</h4><p>MWE Gold 750 V2 — fully modular, semi-passive Smart Thermal Control, 80+ Gold efficient. Excellent value.</p><ul><li>750W Continuous</li><li>80+ Gold Efficient</li><li>Fully Modular</li><li>Smart Thermal Control</li></ul>',
 49, 1, 1, 7, 1, NOW(), NOW()),

(42, 'be quiet! Straight Power 11 850W Platinum',
 '<h4>Whisper-Quiet 80+ Platinum PSU</h4><p>Straight Power 11 850W — 80+ Platinum, Silent Wings 3 fan, fully modular. Ideal for silent high-end builds.</p><ul><li>850W Continuous</li><li>80+ Platinum Efficient</li><li>Silent Wings 3 Fan</li><li>5-Year Warranty</li></ul>',
 50, 1, 1, 7, 1, NOW(), NOW()),

(43, 'SteelSeries Arctis Nova Pro Wireless Headset',
 '<h4>Flagship Gaming Headset</h4><p>Arctis Nova Pro Wireless — dual wireless (2.4 GHz + BT), hot-swap battery system, active noise cancellation, premium hi-res audio.</p><ul><li>Dual Wireless 2.4 GHz + BT</li><li>Hot-Swap Battery</li><li>Active Noise Cancellation</li><li>Hi-Res Certified</li></ul>',
 51, 1, 1, 7, 1, NOW(), NOW()),

(44, 'HyperX Cloud III Gaming Headset',
 '<h4>Iconic Comfort Gaming Headset</h4><p>Cloud III — 53mm angled drivers, DTS Headphone:X spatial audio, signature memory-foam comfort. Wired and wireless options.</p><ul><li>53mm Angled Drivers</li><li>DTS Headphone:X</li><li>Memory Foam Cushions</li><li>Detachable Microphone</li></ul>',
 52, 1, 1, 7, 1, NOW(), NOW()),

(45, 'Razer BlackShark V2 Pro Wireless Headset',
 '<h4>Esports-Tuned Wireless Headset</h4><p>BlackShark V2 Pro — TriForce Titanium 50mm drivers, HyperClear Super-Wideband mic, 70-hour battery, used in pro tournaments worldwide.</p><ul><li>TriForce 50mm Titanium</li><li>HyperClear SWB Mic</li><li>70-Hour Battery</li><li>Razer HyperSpeed Wireless</li></ul>',
 53, 1, 1, 7, 1, NOW(), NOW()),

(46, 'ASUS ROG Swift PG279QM 27" 240Hz Monitor',
 '<h4>Pro Esports Gaming Monitor</h4><p>PG279QM — 27\" 1440p IPS at 240Hz with G-SYNC. Pro-grade color accuracy and ultra-low motion blur. Pre-calibrated from the factory.</p><ul><li>27\" 2560×1440 IPS</li><li>240Hz Refresh Rate</li><li>NVIDIA G-SYNC</li><li>HDR400</li></ul>',
 54, 1, 1, 12, 1, NOW(), NOW()),

(47, 'Samsung Odyssey G7 32" Curved Monitor',
 '<h4>Immersive 1000R Curved Gaming Monitor</h4><p>Odyssey G7 — 32\" 1440p VA panel with extreme 1000R curve, 240Hz, 1ms response, NVIDIA G-SYNC compatible.</p><ul><li>32\" 2560×1440 VA</li><li>1000R Curve</li><li>240Hz / 1ms GTG</li><li>HDR600 / G-SYNC Compatible</li></ul>',
 55, 1, 1, 13, 1, NOW(), NOW()),

(48, 'AOC 24G2 24" 144Hz Budget Monitor',
 '<h4>Best Budget 1080p Gaming Monitor</h4><p>AOC 24G2 — 24\" 1080p IPS at 144Hz with FreeSync Premium. Stunning value and an esports favorite.</p><ul><li>24\" 1920×1080 IPS</li><li>144Hz Refresh Rate</li><li>FreeSync Premium</li><li>1ms MPRT</li></ul>',
 56, 1, 1, 12, 1, NOW(), NOW()),

(49, 'Logitech Brio 4K Webcam',
 '<h4>Pro 4K Streaming Webcam</h4><p>Brio 4K — Ultra HD 4K at 30fps, HDR support, 5× digital zoom, Windows Hello facial recognition. Pro-grade streaming.</p><ul><li>4K UHD @ 30fps</li><li>HDR Support</li><li>5× Digital Zoom</li><li>Windows Hello</li></ul>',
 57, 1, 1, 7, 1, NOW(), NOW()),

(50, 'Logitech StreamCam 1080p Webcam',
 '<h4>Streamer-Focused 1080p Webcam</h4><p>StreamCam — Full HD 1080p at 60fps, smart auto-framing, USB-C, vertical video mode. Made for content creators.</p><ul><li>1080p @ 60fps</li><li>USB-C Connection</li><li>Smart Auto-Framing</li><li>Vertical Video Mode</li></ul>',
 58, 1, 1, 7, 1, NOW(), NOW());

-- ─── PRODUCT IMAGES (rotation across existing assets) ────────
INSERT IGNORE INTO product_images (pr_id, images) VALUES
  (21, 'assets/images/product/product-01.png'), (21, 'assets/images/product/product-02.png'),
  (22, 'assets/images/product/product-02.png'), (22, 'assets/images/product/product-03.png'),
  (23, 'assets/images/product/product-03.png'), (23, 'assets/images/product/product-01.png'),
  (24, 'assets/images/product/product-01.png'), (24, 'assets/images/product/product-02.png'),
  (25, 'assets/images/product/product-02.png'), (25, 'assets/images/product/product-03.png'),
  (26, 'assets/images/product/product-03.png'), (26, 'assets/images/product/product-01.png'),
  (27, 'assets/images/product/product-01.png'), (27, 'assets/images/product/product-02.png'),
  (28, 'assets/images/product/product-02.png'), (28, 'assets/images/product/product-03.png'),
  (29, 'assets/images/product/product-03.png'), (29, 'assets/images/product/product-01.png'),
  (30, 'assets/images/product/product-01.png'), (30, 'assets/images/product/product-02.png'),
  (31, 'assets/images/product/product-02.png'), (31, 'assets/images/product/product-03.png'),
  (32, 'assets/images/product/product-03.png'), (32, 'assets/images/product/product-01.png'),
  (33, 'assets/images/product/product-01.png'), (33, 'assets/images/product/product-02.png'),
  (34, 'assets/images/product/product-02.png'), (34, 'assets/images/product/product-03.png'),
  (35, 'assets/images/product/product-03.png'), (35, 'assets/images/product/product-01.png'),
  (36, 'assets/images/product/product-01.png'), (36, 'assets/images/product/product-02.png'),
  (37, 'assets/images/product/product-02.png'), (37, 'assets/images/product/product-03.png'),
  (38, 'assets/images/product/product-03.png'), (38, 'assets/images/product/product-01.png'),
  (39, 'assets/images/product/product-01.png'), (39, 'assets/images/product/product-02.png'),
  (40, 'assets/images/product/product-02.png'), (40, 'assets/images/product/product-03.png'),
  (41, 'assets/images/product/product-03.png'), (41, 'assets/images/product/product-01.png'),
  (42, 'assets/images/product/product-01.png'), (42, 'assets/images/product/product-02.png'),
  (43, 'assets/images/product/product-02.png'), (43, 'assets/images/product/product-03.png'),
  (44, 'assets/images/product/product-03.png'), (44, 'assets/images/product/product-01.png'),
  (45, 'assets/images/product/product-01.png'), (45, 'assets/images/product/product-02.png'),
  (46, 'assets/images/product/product-02.png'), (46, 'assets/images/product/product-03.png'),
  (47, 'assets/images/product/product-03.png'), (47, 'assets/images/product/product-01.png'),
  (48, 'assets/images/product/product-01.png'), (48, 'assets/images/product/product-02.png'),
  (49, 'assets/images/product/product-02.png'), (49, 'assets/images/product/product-03.png'),
  (50, 'assets/images/product/product-03.png'), (50, 'assets/images/product/product-01.png');

-- ─── STOCK FOR EXTRA PRODUCTS ────────────────────────────────
INSERT IGNORE INTO stock (id, product_id, price, qty, discount_id, status_id, created_at, updated_at) VALUES
  (21, 21, 449.99,  30, 3, 1, NOW(), NOW()),
  (22, 22, 269.99,  25, 2, 1, NOW(), NOW()),
  (23, 23, 319.99,  28, 1, 1, NOW(), NOW()),
  (24, 24, 169.99,  40, 4, 1, NOW(), NOW()),
  (25, 25, 159.99,  35, 1, 1, NOW(), NOW()),
  (26, 26, 229.99,  20, 2, 1, NOW(), NOW()),
  (27, 27, 119.99,  45, 1, 1, NOW(), NOW()),
  (28, 28,  59.99,  60, 3, 1, NOW(), NOW()),
  (29, 29, 119.99,  35, 2, 1, NOW(), NOW()),
  (30, 30, 339.99,  18, 1, 1, NOW(), NOW()),
  (31, 31,  89.99,  50, 4, 1, NOW(), NOW()),
  (32, 32, 199.99,  22, 1, 1, NOW(), NOW()),
  (33, 33,  84.99,  30, 2, 1, NOW(), NOW()),
  (34, 34,  37.99,  80, 3, 1, NOW(), NOW()),
  (35, 35,  32.99,  60, 1, 1, NOW(), NOW()),
  (36, 36, 109.99,  25, 2, 1, NOW(), NOW()),
  (37, 37, 189.99,  18, 1, 1, NOW(), NOW()),
  (38, 38, 109.99,  22, 4, 1, NOW(), NOW()),
  (39, 39, 219.99,  14, 1, 1, NOW(), NOW()),
  (40, 40, 139.99,  30, 2, 1, NOW(), NOW()),
  (41, 41,  99.99,  40, 1, 1, NOW(), NOW()),
  (42, 42, 179.99,  20, 3, 1, NOW(), NOW()),
  (43, 43, 349.99,  12, 2, 1, NOW(), NOW()),
  (44, 44,  99.99,  35, 1, 1, NOW(), NOW()),
  (45, 45, 179.99,  22, 4, 1, NOW(), NOW()),
  (46, 46, 599.99,  10, 2, 1, NOW(), NOW()),
  (47, 47, 699.99,   8, 1, 1, NOW(), NOW()),
  (48, 48, 169.99,  28, 3, 1, NOW(), NOW()),
  (49, 49, 199.99,  18, 1, 1, NOW(), NOW()),
  (50, 50, 169.99,  24, 2, 1, NOW(), NOW());

SELECT 'Extra seed complete!' AS result;
SELECT COUNT(*) AS total_products FROM product;
SELECT COUNT(*) AS total_stock FROM stock;
