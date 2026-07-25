
-- Insert Categories
INSERT INTO public.categories (id, name, slug, description, sort_order)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Accessories/Adapter/Cables', 'accessories-adapter-cables', 'Various adapters, cables, and charging accessories.', 1),
  ('22222222-2222-2222-2222-222222222222', 'Projectors', 'projectors', 'Smart portable projectors and displays.', 2),
  ('33333333-3333-3333-3333-333333333333', 'Tempered/Case', 'tempered-case', 'Protective cases and tempered glass for mobile devices.', 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO public.products (id, name, slug, price, category_id, stock_quantity, is_visible, description)
VALUES
  (gen_random_uuid(), '20W USB-C Power Adapter', '20w-usb-c-power-adapter', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product Information

Overview
The Apple 20W USB C Power Adapter offers fast, efficient charging at home, in the office or on the go. Pair it with iPhone 8 or later for fast charging — up to 50 per cent battery in around 35 minutes.¹ Or pair it with the iPad Pro and iPad Air for optimal charging performance. You can also pair it with iPhone 8 or later to take advantage of the fast-charging feature.
Charging cable sold separately.

What’s in the Box
Apple 20W USB-C Power Adapter

Tech Specs
USB C

Details of the Items in the Package (Number of Units/Quantity)
POWER ADAPTER 1N

Common/Generic Name of the Product
POWER ADAPTER

Compatibility
iPhone Models
• iPhone 17 Pro to iPhone 8
iPad Models
• iPad Pro, iPad Air, iPad (A16 to 7th Gen), iPad mini
Mac Models
• MacBook Neo
Apple Watch Models
• Ultra 3 to Series 1
HomePod Models
• HomePod mini
AirPods Models
• AirPods Pro 3 to 1st Gen, AirPods Max$desc$),
  (gen_random_uuid(), '35W Dual USB-C Port Power Adapter', '35w-dual-usb-c-port-power-adapter', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product Information

Overview
The 35W Dual USB C Port Power Adapter allows you to charge two devices at the same time, whether you’re at home, in the office or on the go. Apple recommends using it with MacBook Neo and MacBook Air for those who want the flexibility of an additional charging port. You can also use it with iPhone, iPad, Apple Watch and AirPods.
Charging cable sold separately.

What’s in the Box
Apple 35W Dual USB-C Port Power Adapter

Tech Specs
USB C

Details of the Items in the Package (Number of Units/Quantity)
POWER ADAPTER 1N, AC WALL PLUG 1N

Common/Generic Name of the Product
POWER ADAPTER$desc$),
  (gen_random_uuid(), 'APPLE USB-C to Lightning Cable (1m)', 'apple-usb-c-to-lightning-cable-1m', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product Information

Overview
Connect your device with Lightning connector to your USB-C– or Thunderbolt 3 (USB-C)–enabled device for syncing and charging, or to your USB-C–enabled iPad for charging.
You can also use this cable with your Apple 18W, 20W, 29W, 30W, 61W, 87W or 96W USB C Power Adapter to charge your iOS device and even take advantage of the fast-charging feature on selected iPhone and iPad models.

What’s in the Box
Apple USB-C to Lightning Cable (1m)

Tech Specs
Lightning
USB C$desc$),
  (gen_random_uuid(), 'Samsung Original 65W Trio Port Super Fast Charger', 'samsung-original-65w-trio-port-super-fast-charger', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product information

Features & Specs
Connector Type: USB
Compatible Devices: Samsung
Compatible Phone Models: All Android Mobiles
Additional Features: Charging Indicator, Fast Charging
Input Voltage: 240 Volts
Total USB Ports: 3
Wattage: 65 Watts
Output Current: 65 Milliamps
Power Source: Battery Powered
Frequency Range: 50 hz - 60 hd
Main Power Connector Type: 3 pin
Mounting Type: Wall Mount
Connectivity Technology: USB

Measurements
Number of Items: 2
Item Weight Unit of Measure: 177.5 Grams
Unit Count: 1 Piece

Additional details
Colour: Black

Item details
Brand Name: Samsung
Box Contents: Travel Adapter , Quick Start Guide
Warranty Description: 6 Months Manufacturer Warranty
Item Type Name: Wall Charger

Compatibility
Samsung Galaxy S23, S23 Plus, S23 Ultra, Z Fold4, Z Flip 4, S22 Series, S21 Series, etc.$desc$),
  (gen_random_uuid(), '45W Type-C Adaptor with Cable', '45w-type-c-adaptor-with-cable', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Specifications

Colour: Black

Compatible Models
Super Fast Charging :
Galaxy S10 5G, Galaxy Note10, Galaxy Z Fold2, Galaxy Z Flip3 & Later
Super Fast Charging 2.0 : Galaxy Note 10+, Galaxy S20 Ultra, Galaxy S22+, Galaxy S23+

General Feature
Super Fast Charging 2.0 max. 45W, PD 3.0 PDO/PPS max. 45W, Low Standby Power Consumption( <5mW )

Interface: USB-C
Packaging Contents: Power Adapter, USB-C to USB-C 5A Cable

Power
Input Voltage: 100-240 V
Output Voltage (Max, Normal Charge): 5 V
Output Voltage (Max, Fast Charge): PDO : 9 V, 15 V, 20 V / PPS : 5.0-20.0 V
Output Current (Max, Normal Charge): 3 A
Output Current (Max, Fast Charge): PDO : 3 A(9 V, 15 V), 2.25 A(20 V) / PPS : 2.25 A(5.0-20.0 V)$desc$),
  (gen_random_uuid(), '25W Travel Adaptor without Cable', '25w-travel-adaptor-without-cable', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Specifications
Overview

Colour-Black
Weight-73 g

Compatible Models
Super Fast Charging 25W compatible with Galaxy S10 5G, A80, A70, and future compatible devices

General Feature
Super Fast Charging max. 25W, PD 3.0 PPS max. 25W, Zero Standby Power Consumption( <5mW )

Interface: USB Type-C
Packaging Contents: Wall Charger, Leaflet
Physical specification
Dimension (WxHxD): 4.60 cm x 2.62 cm x 6.89 cm
Product Weight: 73 g

Power
Input Voltage: 100-240 V
Output Voltage (Max, Normal Charge): 5 V
Output Voltage (Max, Fast Charge): PDO : 9 V / PPS : 3.3-5.9 V or 3.3-11.0 V
Output Current (Max, Normal Charge): 3 A
Output Current (Max, Fast Charge): PDO : 2.77 A(9 V) / PPS : 3.0 A(3.3-5.9 V) or 2.25 A(3.3-11.0 V)$desc$),
  (gen_random_uuid(), '45W Type-C Adaptor without Cable', '45w-type-c-adaptor-without-cable', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Specifications
Colour: Black

Compatible Models
Super Fast Charging : Galaxy S10 5G, Galaxy Note10, Galaxy Z Fold2, Galaxy Z Flip3 & Later
Super Fast Charging 2.0 : Galaxy Note 10+, Galaxy S20 Ultra, Galaxy S22+, Galaxy S23+

General Feature
Features: Super Fast Charging 2.0 max. 45W, PD 3.0 PDO/PPS max. 45W, Low Standby Power Consumption( <5mW )

Interface: USB-C
Packaging Contents: Power Adapter, USB-C to USB-C 5A Cable

Power
Input Voltage: 100-240 V
Output Voltage (Max, Normal Charge): 5 V
Output Voltage (Max, Fast Charge): PDO : 9 V, 15 V, 20 V / PPS : 5.0-20.0 V
Output Current (Max, Normal Charge): 3 A
Output Current (Max, Fast Charge): PDO : 3 A(9 V, 15 V), 2.25 A(20 V) / PPS : 2.25 A(5.0-20.0 V)$desc$),
  (gen_random_uuid(), 'vivo 80W FlashCharge Charger Adapter', 'vivo-80w-flashcharge-charger-adapter', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product : 80W FlashCharge Charger 
Port : USB 
Color : White 
Input : 100-240V ~ 50/60Hx, 2.5A
Output : 5.0V 2.0A 10.0W or 9.0V 2.0A 18W or 11.0V 6A 66W or 20V 4A Max 80.0W Max$desc$),
  (gen_random_uuid(), 'Oneplus Supervooc 45W Adapter', 'oneplus-supervooc-45w-adapter', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product information
Features & Specs
Connector Type: USB Type C
Compatible Devices: Cellular Phones
Compatible Phone Models: oneplus Nord CE 4,Nord CE4 Lite,Nord 3,Nord 4,Nord 2,Nord 1,Nord CE 3,Nord CE 3 Lite,Nord CE,Nord CE 2,oneplus 9R,9RT,11R,10R
Additional Features: Fast Charging
Input Voltage: 240 Volts (AC)
Amperage: 5 Amps
Total USB Ports: 1
Wattage: 45 Watts
Output Current: 5 Amps
Output Voltage: 9 Volts (DC)
Power Source: Corded Electric
Current Rating: 5 Amps
Portable: Yes
Power Plug Type: Type C
Voltage: 240 Volts (AC)
Mounting Type: Wall Mount
Connectivity Technology: USB

Additional details
Colour: White & Red
Enclosure Material: Plastic
Form Factor: Plug$desc$),
  (gen_random_uuid(), 'APPLE TYPE-C TO TYPE-C CHARGER CABLE (1M)', 'apple-type-c-to-type-c-charger-cable-1m', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Product Information

Overview
This 1-metre charge cable is made with a woven design — with USB-C connectors on both ends — and is ideal for charging, syncing and transferring data between USB-C devices. It supports charging of up to 60 watts and transfers data at USB 2 rates. Pair the USB-C Charge Cable with a compatible USB-C power adapter to conveniently charge your devices from a power point and take advantage of fast-charging capabilities. USB-C power adapters sold separately.

What’s in the Box
Apple 60W USB-C Charge Cable (1 m)

Tech Specs
Connections
USB C$desc$),
  (gen_random_uuid(), 'SAMSUNG TYPE-C TO TYPE-C CABLE (1M)', 'samsung-type-c-to-type-c-cable-1m', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$Specifications

Colour: Black
Features: Max. 3A, USB 2.0
Interface: USB Type-C to Type-C

Physical specification
Cable Length: 1 m
Product Weight: 22.2 g$desc$),
  (gen_random_uuid(), 'GOOGLE PIXEL 20W ADAPTER WITH CABLE', 'google-pixel-20w-adapter-with-cable', 0.00, '11111111-1111-1111-1111-111111111111', 10, true, $desc$SPECIFICATIONS
Sales Package - 1 Adapter, Cable
Brand - Google
Color  - White
Type - Wall Charger
Model Number - G1000-IN
Output Interface - USB Type C
Connector Type -Type C to Type C
Number Of Devices/Batteries Charged - 1
Cable Included - Yes
Designed For - Google Pixel 7 Google Pixel 7 Pro Google Pixel 6a Google Pixel 4A
Detachable USB Cable - Yes
Universal Voltage - Yes

Key Features
Power Output - 3.6 A
Power Source - Electric socket
Output Current - 3.6 A
Output Wattage - 18 W$desc$),
  (gen_random_uuid(), 'S40 HD Smart Portable Projector', 's40-hd-smart-portable-projector', 0.00, '22222222-2222-2222-2222-222222222222', 10, true, $desc$S40 HD Smart Portable Projector, 3500 Lumens, 180-Degree Projection Angle, Compact Design with Multiple Ports

Product details
Country of origin: India
Model Year: 2025
Special Feature: As Per Product Description
Includes: Main Product
Brand: Generic
Net Quantity: 1 unit
Package Dimension: 10L x 10W x 10H cm
Manufacturer or packer name: Digismart Store
Manufacturer or packer address: India$desc$),
  (gen_random_uuid(), 'Spigen Tempered Glass Guard', 'spigen-tempered-glass-guard', 0.00, '33333333-3333-3333-3333-333333333333', 10, true, $desc$Spigen Tempered Glass Guard for iPhone 11 to iPhone 17 & Samsung All S-Series

Brand: Spigen
Compatible Devices: iPhone 11 TO iPhone 17 & Samsung All S-Series
Material: Tempered Glass
Item Hardness: 9H
Product Dimensions: 14.5L x 6.7W Centimeters
Compatible Phone Models: Apple iPhone 17
Special Feature: Innovative Easy Installation
Finish Type: Glossy
Net Quantity: 3.00 Count
Screen Surface Description: Glossy$desc$),
  (gen_random_uuid(), 'Spigen Clear Crystal Back Cover Case', 'spigen-clear-crystal-back-cover-case', 0.00, '33333333-3333-3333-3333-333333333333', 10, true, $desc$Spigen Clear Crystal Back Cover Case for iPhone11 to iPhone 17, Clear Transparent, Never Yellow case (Anti Yellow)

Premium quality clear case that won't yellow over time. Provides excellent drop protection while showing off your phone's original color.$desc$)
ON CONFLICT (slug) DO NOTHING;
