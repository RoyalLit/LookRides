-- Migration to seed Toyota Innova Hycross and Force Urbania into the fleet table
INSERT INTO fleet (name, category, seats, bags, price_desc, image_url, is_active, order_index)
VALUES 
  ('Toyota Innova Hycross', 'Premium SUV', 7, 4, 'Hybrid Premium SUV', '/innova.png', true, 3),
  ('Force Urbania Luxury', 'Mini Bus', 12, 10, 'Executive High-Roof Van', '/tempo.png', true, 4);
