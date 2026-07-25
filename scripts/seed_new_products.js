import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbGdhYXpvam93bXltbXhwZGpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTAwMzc1NSwiZXhwIjoyMTAwNTc5NzU1fQ.nSNAD6EVqz88wzxxCh5UPV3ZGWQJHTItSmJVs89aBOU";

const supabase = createClient(envConfig.VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

const NEW_CATEGORIES = [
  { slug: "projectors", name: "Projectors", sort_order: 7 },
  { slug: "adapters", name: "Adapters", sort_order: 2 },
  { slug: "cables", name: "Cables", sort_order: 3 },
  { slug: "temper", name: "Tempered Glass", sort_order: 4 },
];

const NEW_PRODUCTS = [
  {
    category: "adapters",
    name: "20W USB-C Power Adapter",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product Information

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
• iPhone Air • iPhone 17 Pro • iPhone 17 Pro Max • iPhone 17 • iPhone 17e • iPhone 16 Pro • iPhone 16 Pro Max • iPhone 16 • iPhone 16 Plus • iPhone 16e • iPhone 15 Pro • iPhone 15 Pro Max • iPhone 15 • iPhone 15 Plus • iPhone 14 Pro • iPhone 14 Pro Max • iPhone 14 • iPhone 14 Plus • iPhone 13 Pro • iPhone 13 Pro Max • iPhone 13 mini • iPhone 13 • iPhone SE (3rd generation) • iPhone 12 Pro • iPhone 12 Pro Max • iPhone 12 mini • iPhone 12 • iPhone 11 Pro • iPhone 11 Pro Max • iPhone 11 • iPhone SE (2nd generation) • iPhone XS • iPhone XS Max • iPhone XR • iPhone X • iPhone 8 • iPhone 8 Plus

iPad Models
iPad Pro 13-inch (M5) • iPad Pro 13″ (M4) • iPad Pro 12.9” (6th generation) • iPad Pro 12.9” (5th generation) • iPad Pro 12.9” (4th generation) • iPad Pro 12.9” (3rd generation) • iPad Pro 12.9” (2nd generation) • iPad Pro 12.9” (1st generation) • iPad Pro 11-inch (M5) • iPad Pro 11″ (M4) • iPad Pro 11” (4th generation) • iPad Pro 11” (3rd generation) • iPad Pro 11” (2nd generation) • iPad Pro 11” (1st generation) • iPad Pro 10.5” • iPad Air 13-inch (M4) • iPad Air 11-inch (M4) • iPad Air 13″ (M3) • iPad Air 11″ (M3) • iPad Air 13″ (M2) • iPad Air 11″ (M2) • iPad Air (5th generation) • iPad Air (4th generation) • iPad Air (3rd generation) • iPad (A16) • iPad (10th generation) • iPad (9th generation) • iPad (8th generation) • iPad (7th generation) • iPad mini (A17 Pro) • iPad mini (6th generation) • iPad mini (5th generation)

Mac Models
• MacBook Neo

Apple Watch Models
• Apple Watch Ultra 3 • Apple Watch Ultra 2 • Apple Watch Ultra • Apple Watch SE 3 • Apple Watch SE 2 • Apple Watch SE • Apple Watch Series 11 • Apple Watch Series 10 • Apple Watch Series 9 • Apple Watch Series 8 • Apple Watch Series 7 • Apple Watch Series 6 • Apple Watch Series 5 • Apple Watch Series 4 • Apple Watch Series 3 • Apple Watch Series 2 • Apple Watch Series 1 • Apple Watch 1st generation

HomePod Models
• HomePod mini

AirPods Models
• AirPods Pro 3 • AirPods 4 • AirPods 4 with Active Noise Cancellation • AirPods Pro 2 • AirPods Pro 2 with MagSafe Charging Case (Lightning) • AirPods Pro (1st generation) with MagSafe Lightning Charging Case • AirPods (3rd generation) with MagSafe Charging Case • AirPods (3rd generation) with Lightning Charging Case • AirPods with Wireless Charging Case (2nd generation) • AirPods (2nd generation) • AirPods Max 2 • AirPods Max • AirPods Max (Lightning Connector) • AirPods (1st generation)`
  },
  {
    category: "adapters",
    name: "35W Dual USB-C Port Power Adapter",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product Information

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
POWER ADAPTER

Compatibility
iPhone Models
• iPhone Air • iPhone 17 Pro • iPhone 17 Pro Max • iPhone 17 • iPhone 17e • iPhone 16 Pro • iPhone 16 Pro Max • iPhone 16 • iPhone 16 Plus • iPhone 16e • iPhone 15 Pro • iPhone 15 Pro Max • iPhone 15 • iPhone 15 Plus • iPhone 14 Pro • iPhone 14 Pro Max • iPhone 14 • iPhone 14 Plus • iPhone 13 Pro • iPhone 13 Pro Max • iPhone 13 mini • iPhone 13 • iPhone SE (3rd generation) • iPhone 12 Pro • iPhone 12 Pro Max • iPhone 12 mini • iPhone 12 • iPhone 11 Pro • iPhone 11 Pro Max • iPhone 11 • iPhone SE (2nd generation) • iPhone XS • iPhone XS Max • iPhone XR • iPhone X • iPhone 8 • iPhone 8 Plus

iPad Models
• iPad Pro 13-inch (M5) • iPad Pro 13″ (M4) • iPad Pro 12.9” (6th generation) • iPad Pro 12.9” (5th generation) • iPad Pro 12.9” (4th generation) • iPad Pro 12.9” (3rd generation) • iPad Pro 12.9” (2nd generation) • iPad Pro 12.9” (1st generation) • iPad Pro 11-inch (M5) • iPad Pro 11″ (M4) • iPad Pro 11” (4th generation) • iPad Pro 11” (3rd generation) • iPad Pro 11” (2nd generation) • iPad Pro 11” (1st generation) • iPad Pro 10.5” • iPad Air 13-inch (M4) • iPad Air 11-inch (M4) • iPad Air 13″ (M3) • iPad Air 11″ (M3) • iPad Air 13″ (M2) • iPad Air 11″ (M2) • iPad Air (5th generation) • iPad Air (4th generation) • iPad Air (3rd generation) • iPad (A16) • iPad (10th generation) • iPad (9th generation) • iPad (8th generation) • iPad (7th generation) • iPad mini (A17 Pro) • iPad mini (6th generation) • iPad mini (5th generation)

Mac Models
• MacBook Neo • MacBook Air (13-inch, M5) • MacBook Air (15-inch, M5) • MacBook Air (13”, M4, 2025) • MacBook Air (15”, M4, 2025) • MacBook Air (13”, M3, 2024) • MacBook Air (15”, M3, 2024) • MacBook Air (13”, M2, 2022) • MacBook Air (M1) • MacBook Air (Retina, 13”, 2020) • MacBook Air (Retina, 13”, 2018–2019)

Apple Watch Models
• Apple Watch Ultra 3 • Apple Watch Ultra 2 • Apple Watch Ultra • Apple Watch SE 3 • Apple Watch SE 2 • Apple Watch SE • Apple Watch Series 11 • Apple Watch Series 10 • Apple Watch Series 9 • Apple Watch Series 8 • Apple Watch Series 7 • Apple Watch Series 6 • Apple Watch Series 5 • Apple Watch Series 4 • Apple Watch Series 3 • Apple Watch Series 2 • Apple Watch Series 1 • Apple Watch 1st generation

AirPods Modelsi
• AirPods 4 • AirPods 4 with Active Noise Cancellation • AirPods Pro 2 • AirPods Pro 2 with MagSafe Charging Case (Lightning) • AirPods Pro (1st generation) with MagSafe Lightning Charging Case • AirPods (3rd generation) with MagSafe Charging Case • AirPods (3rd generation) with Lightning Charging Case • AirPods with Wireless Charging Case (2nd generation) • AirPods (2nd generation) • AirPods Max 2 • AirPods Max • AirPods Max (Lightning Connector) • AirPods (1st generation)`
  },
  {
    category: "cables",
    name: "APPLE USB-C to Lightning Cable (1m)",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product Information

Overview
Connect your device with Lightning connector to your USB-C– or Thunderbolt 3 (USB-C)–enabled device for syncing and charging, or to your USB-C–enabled iPad for charging.
You can also use this cable with your Apple 18W, 20W, 29W, 30W, 61W, 87W or 96W USB C Power Adapter to charge your iOS device and even take advantage of the fast-charging feature on selected iPhone and iPad models.

What’s in the Box
Apple USB-C to Lightning Cable (1m)

Tech Specs
Lightning
USB C

Compatibility
iPhone Models
• iPhone 14 Pro • iPhone 14 Pro Max • iPhone 14 • iPhone 14 Plus • iPhone 13 Pro • iPhone 13 Pro Max • iPhone 13 mini • iPhone 13 • iPhone SE (3rd generation) • iPhone 12 Pro • iPhone 12 Pro Max • iPhone 12 mini • iPhone 12 • iPhone 11 Pro • iPhone 11 Pro Max • iPhone 11 • iPhone SE (2nd generation) • iPhone XS • iPhone XS Max • iPhone XR • iPhone X • iPhone 8 • iPhone 8 Plus • iPhone 7 • iPhone 7 Plus • iPhone 6s • iPhone 6s Plus • iPhone 6 • iPhone 6 Plus • iPhone SE (1st generation) • iPhone 5s • iPhone 5c • iPhone 5

iPad Models
• iPad Pro 13-inch (M5) • iPad Pro 13″ (M4) • iPad Pro 12.9” (6th generation) • iPad Pro 12.9” (5th generation) • iPad Pro 12.9” (4th generation) • iPad Pro 12.9” (3rd generation) • iPad Pro 12.9” (2nd generation) • iPad Pro 12.9” (1st generation) • iPad Pro 11-inch (M5) • iPad Pro 11″ (M4) • iPad Pro 11” (4th generation) • iPad Pro 11” (3rd generation) • iPad Pro 11” (2nd generation) • iPad Pro 11” (1st generation) • iPad Pro 10.5” • iPad Pro 9.7” • iPad Air 13-inch (M4) • iPad Air 11-inch (M4) • iPad Air 13″ (M3) • iPad Air 11″ (M3) • iPad Air 13″ (M2) • iPad Air 11″ (M2) • iPad Air (5th generation) • iPad Air (4th generation) • iPad Air (3rd generation) • iPad Air 2 • iPad Air (1st generation) • iPad (A16) • iPad (10th generation) • iPad (9th generation) • iPad (8th generation) • iPad (7th generation) • iPad (6th generation) • iPad (5th generation) • iPad mini (A17 Pro) • iPad mini (6th generation) • iPad mini (5th generation) • iPad mini 4 • iPad mini 3 • iPad mini 2 • iPad mini (1st generation)

Mac Models
• MacBook Neo • MacBook Air (13-inch, M5) • MacBook Air (15-inch, M5) • MacBook Air (13”, M4, 2025) • MacBook Air (15”, M4, 2025) • MacBook Air (13”, M3, 2024) • MacBook Air (15”, M3, 2024) • MacBook Air (15”, M2, 2023) • MacBook Air (13”, M2, 2022) • MacBook Air (M1) • MacBook Air (Retina, 13”, 2020) • MacBook Air (Retina, 13”, 2018–2019) • MacBook Pro (14-inch, M5 Pro or M5 Max) • MacBook Pro (16-inch, M5 Pro or M5 Max) • MacBook Pro (14-inch, M5) • MacBook Pro (14”, 2024) • MacBook Pro (16”, 2024) • MacBook Pro (14”, 2023) • MacBook Pro (16”, 2023) • MacBook Pro (13”, M2, 2022) • MacBook Pro (14”, 2021) • MacBook Pro (16”, 2021) • MacBook Pro (16”, 2019) • MacBook Pro (13”, M1, 2020) • MacBook Pro (13”, 2020) • iMac (24 inch, M4, 2024) • iMac (24”, M3, 2023) • iMac (24”, M1, 2021) • iMac (Retina 4K, 21.5”, 2019) • iMac (Retina 5K, 27”, 2019–2020) • iMac Pro (2017) • Mac Studio (2025) • Mac Studio (2023) • Mac Studio (2022) • Mac mini (2024) • Mac mini (2023) • Mac mini (M1, 2020) • Mac mini (2018) • Mac Pro (2023) • Mac Pro (2019)

iPod Models
• iPod touch (7th generation) • iPod touch (6th generation) • iPod touch (5th generation) • iPod nano (7th generation)

AirPods Models
• AirPods Pro 2 with MagSafe Charging Case (Lightning) • AirPods Pro (1st generation) with MagSafe Lightning Charging Case • AirPods (3rd generation) with MagSafe Charging Case • AirPods (3rd generation) with Lightning Charging Case • AirPods with Wireless Charging Case (2nd generation) • AirPods (2nd generation) • AirPods Max (Lightning Connector) • AirPods (1st generation)

Display Models
• Studio Display (2026) • Studio Display XDR`
  },
  {
    category: "adapters",
    name: "Samsung Original 65W Trio Port,Type-C, USB-A,Super Fast Charger",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product information

Features & Specs
Connector Type: USB
Compatible Devices: Samsung
Compatible Phone Models: All Android Mobiles &
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
Phone Models
Samsung Galaxy S23, Samsung Galaxy S23 Plus, Samsung Galaxy S23 Ultra, Samsung Galaxy Z Fold4, Samsung Galaxy Z Flip 4, Samsung Galaxy Z Flip 3, Samsung Galaxy Z Fold3, Samsung Galaxy Z Flip, Samsung Galaxy Z Fold2, Samsung Galaxy S22, Samsung Galaxy S22+, Samsung Galaxy S22 Ultra, Samsung Galaxy S21, Samsung Galaxy S21+, Samsung Galaxy S21 Ultra, Samsung Galaxy S21 FE 5G, Samsung Galaxy M53 5G, Samsung Galaxy M51, Samsung Galaxy S20, Samsung Galaxy S20 Plus, Samsung Galaxy S20 Ultra, Samsung Galaxy Note 20, Samsung Galaxy Note 10, Samsung Galaxy A14 5G, Samsung Galaxy A33 5G, Samsung Galaxy A53 5G, Samsung Galaxy F23 5G, Samsung Galaxy M33 5G and etc`
  },
  {
    category: "adapters",
    name: "45 W Type-C Adaptor with Cable",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Specifications

Colour
Black

Compatible Models
Super Fast Charging : Galaxy S10 5G, Galaxy Note10, Galaxy Z Fold2, Galaxy Z Flip3 & Later / Galaxy A90 5G, A80, A70, A52, A33, A23, A05, A15 & Later / Galaxy M31s, M51, M62, M23, M53, M14 & Later / Galaxy Tab S7 & Later • Super Fast Charging 2.0 : Galaxy Note 10+, Galaxy S20 Ultra, Galaxy S22+, Galaxy S22 Ultra, Galaxy S23+, Galaxy S23 Ultra, Galaxy S24+, Galaxy S24 Ultra, Galaxy S25+, Galaxy S25 Ultra / Galaxy A36, A56 & Later / Galaxy Tab S7 & Later

General Feature
Features
Super Fast Charging 2.0 max. 45W, PD 3.0 PDO/PPS max. 45W, Low Standby Power Consumption( <5mW )

Interface
USB-C

Packaging Contents
Power Adapter, USB-C to USB-C 5A Cable

Power
Input Voltage
100-240 V
Output Voltage (Max, Normal Charge)
5 V
Output Voltage (Max, Fast Charge)
PDO : 9 V, 15 V, 20 V / PPS : 5.0-20.0 V
Output Current (Max, Normal Charge)
3 A
Output Current (Max, Fast Charge)
PDO : 3 A(9 V, 15 V), 2.25 A(20 V) / PPS : 2.25 A(5.0-20.0 V)`
  },
  {
    category: "adapters",
    name: "25 W Travel Adaptor without Cable",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Specifications
Overview

Colour-Black
Weight-73 g

Compatible Models
Super Fast Charging 25W compatible with Galaxy S10 5G, A80, A70, and future compatible devices

General Feature
Super Fast Charging max. 25W, PD 3.0 PPS max. 25W, Zero Standby Power Consumption( <5mW )

Interface
USB Type-C

Packaging Contents
Wall Charger, Leaflet

Physical specification
Dimension (WxHxD): 4.60 cm x 2.62 cm x 6.89 cm
Product Weight: 73 g

Power
Input Voltage: 100-240 V
Output Voltage (Max, Normal Charge): 5 V
Output Voltage (Max, Fast Charge): PDO : 9 V / PPS : 3.3-5.9 V or 3.3-11.0 V
Output Current (Max, Normal Charge): 3 A
Output Current (Max, Fast Charge): PDO : 2.77 A(9 V) / PPS : 3.0 A(3.3-5.9 V) or 2.25 A(3.3-11.0 V)`
  },
  {
    category: "adapters",
    name: "45 W Type-C Adaptor without Cable",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Specifications

Colour
Black

Compatible Models
Super Fast Charging : Galaxy S10 5G, Galaxy Note10, Galaxy Z Fold2, Galaxy Z Flip3 & Later / Galaxy A90 5G, A80, A70, A52, A33, A23, A05, A15 & Later / Galaxy M31s, M51, M62, M23, M53, M14 & Later / Galaxy Tab S7 & Later • Super Fast Charging 2.0 : Galaxy Note 10+, Galaxy S20 Ultra, Galaxy S22+, Galaxy S22 Ultra, Galaxy S23+, Galaxy S23 Ultra, Galaxy S24+, Galaxy S24 Ultra, Galaxy S25+, Galaxy S25 Ultra / Galaxy A36, A56 & Later / Galaxy Tab S7 & Later

General Feature
Features
Super Fast Charging 2.0 max. 45W, PD 3.0 PDO/PPS max. 45W, Low Standby Power Consumption( <5mW )

Interface
USB-C

Packaging Contents
Power Adapter, USB-C to USB-C 5A Cable

Power
Input Voltage
100-240 V
Output Voltage (Max, Normal Charge)
5 V
Output Voltage (Max, Fast Charge)
PDO : 9 V, 15 V, 20 V / PPS : 5.0-20.0 V
Output Current (Max, Normal Charge)
3 A
Output Current (Max, Fast Charge)
PDO : 3 A(9 V, 15 V), 2.25 A(20 V) / PPS : 2.25 A(5.0-20.0 V)`
  },
  {
    category: "adapters",
    name: "vivo 80W FlashCharge Charger Adapter (Adapter Only)",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product : 80W FlashCharge Charger 
Port : USB 
Color : White 
Input : 100-240V ~ 50/60Hx, 2.5A
Output : 5.0V 2.0A 10.0W or 9.0V 2.0A 18W
or 11.0V 6A 66W or 20V 4A Max 80.0W Max`
  },
  {
    category: "adapters",
    name: "Oneplus Supervooc 45W Adapter",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product information
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
Total USB 2.0 Ports: 1
Power Plug Type: Type C
Voltage: 240 Volts (AC)
Mounting Type: Wall Mount
Connectivity Technology: USB

Additional details
Colour: White & Red
Enclosure Material: Plastic
Form Factor: Plug`
  },
  {
    category: "cables",
    name: "APPLE TYPE-C TO TYPE-C CHARGER CABLE (1M)",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product Information

Overview
This 1-metre charge cable is made with a woven design — with USB-C connectors on both ends — and is ideal for charging, syncing and transferring data between USB-C devices. It supports charging of up to 60 watts and transfers data at USB 2 rates. Pair the USB-C Charge Cable with a compatible USB-C power adapter to conveniently charge your devices from a power point and take advantage of fast-charging capabilities. USB-C power adapters sold separately.

What’s in the Box
Apple 60W USB-C Charge Cable (1 m)

Tech Specs
Connections
USB C

Compatibility
iPhone Models
iPhone Air
iPhone 17 Pro Max
iPhone 17
iPhone 17e
iPhone 16 Pro
iPhone 16 Pro Max
iPhone 16
iPhone 16 Plus
iPhone 16e
iPhone 15 Pro
iPhone 15 Pro Max
iPhone 15
iPhone 15 Plus

iPad Models
iPad Pro 13-inch (M5)
iPad Pro 13″ (M4)
iPad Pro 12.9” (6th generation)
iPad Pro 12.9” (5th generation)
iPad Pro 12.9” (4th generation)
iPad Pro 12.9” (3rd generation)
iPad Pro 11-inch (M5)
iPad Pro 11″ (M4)
iPad Pro 11” (4th generation)
iPad Pro 11” (3rd generation)
iPad Pro 11” (2nd generation)
iPad Pro 11” (1st generation)
iPad Air 13-inch (M4)
iPad Air 11-inch (M4)
iPad Air 13″ (M3)
iPad Air 11″ (M3)
iPad Air 13″ (M2)
iPad Air 11″ (M2)
iPad Air (5th generation)
iPad Air (4th generation)
iPad (A16)
iPad (10th generation)
iPad mini (A17 Pro)
iPad mini (6th generation)

Mac Models
MacBook Neo
MacBook Air (13-inch, M5)
MacBook Air (15-inch, M5)
MacBook Air (13”, M4, 2025)
MacBook Air (15”, M4, 2025)
MacBook Air (13”, M3, 2024)
MacBook Air (15”, M3, 2024)
MacBook Air (15”, M2, 2023)
MacBook Air (13”, M2, 2022)
MacBook Air (M1)
MacBook Air (Retina, 13”, 2020)
MacBook Air (Retina, 13”, 2018–2019)
MacBook Pro (14-inch, M5 Pro or M5 Max)
MacBook Pro (16-inch, M5 Pro or M5 Max)
MacBook Pro (14-inch, M5)
MacBook Pro (14”, 2024)
MacBook Pro (16”, 2024)
MacBook Pro (14”, 2023)
MacBook Pro (16”, 2023)
MacBook Pro (13”, M2, 2022)
MacBook Pro (14”, 2021)
MacBook Pro (16”, 2021)
MacBook Pro (16”, 2019)
MacBook Pro (13”, M1, 2020)
MacBook Pro (13”, 2020)
iMac (24 inch, M4, 2024)
iMac (24”, M1, 2021)
iMac (Retina 4K, 21.5”, 2019)
iMac (Retina 5K, 27”, 2019–2020)
iMac Pro (2017)
Mac Studio (2025)
Mac Studio (2023)
Mac Studio (2022)
Mac mini (2024)
Mac mini (2023)
Mac mini (M1, 2020)
Mac mini (2018)
Mac Pro (2023)
Mac Pro (2019)

Apple Vision Pro
Apple Vision Pro (M5)
Apple Vision Pro (M2)

AirPods Models
AirPods Pro 3
AirPods 4
AirPods 4 with Active Noise Cancellation
AirPods Pro 2
AirPods Max 2
AirPods Max`
  },
  {
    category: "cables",
    name: "SAMSUNG TYPE-C TO TYPE-C CABLE (1M)",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Specifications

Colour: Black

Features: Max. 3A, USB 2.0

Interface: USB Type-C to Type-C

Physical specification
Cable Length: 1 m
Product Weight: 22.2 g`
  },
  {
    category: "adapters",
    name: "GOOGLE PIXEL 20W ADAPTER WITH CABLE",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `SPECIFICATIONS
Sales Package - 1 Adapter, Cable
Brand - Google
Color - White
Type - Wall Charger
Model Number - G1000-IN
Output Interface - USB Type C
Display - No
Connector Type -Type C to Type C
Number Of Devices/Batteries Charged - 1
Cable Included - Yes
Designed For - Google Pixel 7 Google Pixel 7 Pro Google Pixel 6a Google Pixel 4A
Number Of Charger Pins - 1
Cable Type - Detachable Cable Included
Dual Usb Ports - No
Suitable Device - Mobile
Charging Technology - Quick Charge
Detachable USB Cable - Yes
Universal Voltage - Yes

Key Features
Power Output - 3.6 A
Power Source - Electric socket
Output Current - 3.6 A
Secondary Slot Output - 0 Amp
Output Wattage - 18 W`
  },
  {
    category: "projectors",
    name: "S40 HD Smart Portable Projector, 3500 Lumens, 180-Degree Projection Angle, Compact Design with Multiple Ports",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Product details

Country of origin: India
Model Year: 2025
Special Feature: As Per Product Description
Includes: Main Product
Brand: Generic
Common name: S40 HD Smart Portable Projector, 3500 Lumens, 180-Degree Projection Angle, Compact Design with Multiple Ports
Net Quantity: 1 unit
Package Dimension: 10L x 10W x 10H cm
Manufacturer or packer name: Digismart Store
Manufacturer or packer address: India`
  },
  {
    category: "temper",
    name: "Spigen Tempered Glass Guard for iPhone 11 to iPhone 17 & Samsung All S-Series",
    price: 0,
    original_price: 0,
    rating: 0,
    stock_quantity: 0,
    description: `Brand: Spigen
Compatible Devices: iPhone 11 TO iPhone 17 & Samsung All S-Series
Material: Tempered Glass
Item Hardness: 9H
Product Dimensions: 14.5L x 6.7W Centimeters
Compatible Phone Models: Apple iPhone 17
Special Feature: Innovative Easy Installation
Finish Type: Glossy
Net Quantity: 3.00 Count
Screen Surface Description: Glossy`
  }
];

async function seed() {
  console.log("Seeding Categories...");
  for (const cat of NEW_CATEGORIES) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
    if (error) console.error("Error inserting category", cat.name, error);
  }
  
  const { data: dbCategories } = await supabase.from('categories').select('*');
  const catMap = {};
  dbCategories.forEach(c => catMap[c.slug] = c.id);

  console.log("Seeding Products...");
  for (const prod of NEW_PRODUCTS) {
    const catId = catMap[prod.category];
    if (!catId) {
      console.warn("Category missing for product", prod.name, prod.category);
      continue;
    }
    
    // Create a base slug
    let baseSlug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const dbProduct = {
      name: prod.name,
      slug: baseSlug,
      price: prod.price,
      original_price: prod.original_price,
      rating: prod.rating,
      stock_quantity: prod.stock_quantity,
      description: prod.description,
      category_id: catId,
      is_visible: false, // so they can confirm on admin page
      stock_status: 'in_stock',
      currency: 'INR'
    };

    // If duplicate slugs happen, let's append random suffix
    let { data: existing, error: slugCheckError } = await supabase.from('products').select('id').eq('slug', baseSlug).maybeSingle();
    
    if (existing) {
       console.log(`Product with slug ${baseSlug} already exists. Attempting upsert...`);
       // update it
       const { error } = await supabase.from('products').update(dbProduct).eq('slug', baseSlug);
       if (error) console.error("Error updating product", prod.name, error.message);
    } else {
       const { error } = await supabase.from('products').insert(dbProduct);
       if (error) {
           console.error("Error inserting product", prod.name, error.message);
       }
    }
  }

  console.log("Seeding complete!");
}

seed();
