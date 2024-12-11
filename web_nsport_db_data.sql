/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: web_nsport_db_data
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_brand`
--

DROP TABLE IF EXISTS `tbl_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_brand` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `cartegory_id` int(11) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_brand`
--

LOCK TABLES `tbl_brand` WRITE;
/*!40000 ALTER TABLE `tbl_brand` DISABLE KEYS */;
INSERT INTO `tbl_brand` VALUES
(20,6,'Ao doi tuyen quoc gia'),
(21,6,'Ao cau lac bo'),
(22,7,'Giay da bong futsal'),
(24,7,'Giay da bong san co tu nhien'),
(25,7,'Giay da bong san co nhan tao'),
(26,8,'Giay cau long'),
(27,8,'Giay chay bo'),
(28,9,'Ao khoac cau lac bo'),
(29,9,'Ao khoac gio'),
(30,10,'Banh bong da'),
(31,10,'Tat, vo the thao'),
(32,10,'Vot cau long'),
(33,6,'Ao custom');
/*!40000 ALTER TABLE `tbl_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cartegory`
--

DROP TABLE IF EXISTS `tbl_cartegory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_cartegory` (
  `cartegory_id` int(11) NOT NULL AUTO_INCREMENT,
  `cartegory_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cartegory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cartegory`
--

LOCK TABLES `tbl_cartegory` WRITE;
/*!40000 ALTER TABLE `tbl_cartegory` DISABLE KEYS */;
INSERT INTO `tbl_cartegory` VALUES
(6,'Ao Quan Bong Da'),
(7,'Giay Bong Da'),
(8,'Giay The Thao'),
(9,'Ao Khoac The Thao'),
(10,'Phu Kien Khac');
/*!40000 ALTER TABLE `tbl_cartegory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_data_keyseach`
--

DROP TABLE IF EXISTS `tbl_data_keyseach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_data_keyseach` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(20) NOT NULL,
  `key_seach` varchar(100) NOT NULL,
  `create_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_data_keyseach`
--

LOCK TABLES `tbl_data_keyseach` WRITE;
/*!40000 ALTER TABLE `tbl_data_keyseach` DISABLE KEYS */;
INSERT INTO `tbl_data_keyseach` VALUES
(51,'ex1@gmail.com','ao','2024-12-06');
/*!40000 ALTER TABLE `tbl_data_keyseach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_data_log_user`
--

DROP TABLE IF EXISTS `tbl_data_log_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_data_log_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `product_id` int(100) NOT NULL,
  `time_spent` int(255) NOT NULL,
  `create_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_data_log_user`
--

LOCK TABLES `tbl_data_log_user` WRITE;
/*!40000 ALTER TABLE `tbl_data_log_user` DISABLE KEYS */;
INSERT INTO `tbl_data_log_user` VALUES
(17,'thu@gmail.com',11,12,'2024-11-24'),
(18,'thu@gmail.com',11,1,'2024-11-27'),
(22,'2254810297@vaa.edu.vn',37,4,'2024-11-30'),
(23,'2254810297@vaa.edu.vn',37,1,'2024-11-30'),
(24,'2254810297@vaa.edu.vn',14,3,'2024-11-30'),
(25,'2254810297@vaa.edu.vn',14,2,'2024-11-30'),
(26,'2254810297@vaa.edu.vn',37,1,'2024-12-01'),
(27,'aaaa@gmail.com',16,3,'2024-12-02'),
(28,'2254810297@vaa.edu.vn',31,1,'2024-12-05'),
(29,'2254810297@vaa.edu.vn',32,1,'2024-12-05'),
(30,'2254810297@vaa.edu.vn',49,2,'2024-12-05'),
(31,'2254810297@vaa.edu.vn',38,2,'2024-12-06');
/*!40000 ALTER TABLE `tbl_data_log_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_favourite`
--

DROP TABLE IF EXISTS `tbl_favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_favourite` (
  `id` int(111) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `product_id` int(111) NOT NULL,
  `create_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_favourite`
--

LOCK TABLES `tbl_favourite` WRITE;
/*!40000 ALTER TABLE `tbl_favourite` DISABLE KEYS */;
INSERT INTO `tbl_favourite` VALUES
(1,'thu@gmail.com',14,'2024-12-05'),
(2,'thu@gmail.com',15,'2024-12-05');
/*!40000 ALTER TABLE `tbl_favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_oder`
--

DROP TABLE IF EXISTS `tbl_oder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_oder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `order_code` int(200) NOT NULL,
  `price` int(110) NOT NULL,
  `payment_method` varchar(200) NOT NULL,
  `payment_status` varchar(200) NOT NULL,
  `deliveryAddress` varchar(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `product_id` int(110) NOT NULL,
  `day_create` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_oder`
--

LOCK TABLES `tbl_oder` WRITE;
/*!40000 ALTER TABLE `tbl_oder` DISABLE KEYS */;
INSERT INTO `tbl_oder` VALUES
(11,'thu@gmail.com','0975816808',22321,500000,'COD','Da thanh toan','Hà nội',1,14,'2024-10-01'),
(13,'thu@gmail.com','0975816808',22321,500000,'COD','Da thanh toan','Hà nội',1,14,'2024-10-01'),
(15,'2254810297@vaa.edu.vn','0367872213',12677,50000,'Thanh toan khi nhan hang','Chua thanh toan','Thap muoi',3,14,'2024-11-30'),
(16,'2254810297@vaa.edu.vn','0975816808',56839,1000000,'COD','Chua thanh toan','123 Hoang Nam',1,37,'2024-12-01'),
(17,'2254810297@vaa.edu.vn','0975816808',61570,1000000,'PayBank','Chua thanh toan','123 Hoang Nam',1,37,'2024-12-01'),
(18,'2254810297@vaa.edu.vn','0123456565',12583,1000000,'PayBank','Da thanh toan','123 Hoang Nam',1,37,'2024-12-01');
/*!40000 ALTER TABLE `tbl_oder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `cartegory_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `product_price_new` varchar(255) NOT NULL,
  `product_desc` varchar(5000) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES
(11,'Ao bong da doi tuyen Bi Euro 2024',6,20,'500000','249000','N-SPORTS','sp1.1.jpg'),
(14,'Ao Bong Da AL Nassr Trang 2023-2024',6,21,'300000','149000','N-SPORTS','1.jpg'),
(15,'Ao Bong Da Manchester City san nha 2024-2025',6,21,'300000','159000','N-SPORTS','mc1.jpg'),
(16,'Balls AUTHENTIC Original ADIDAS PRO SOCCER',10,29,'300000','199000','N-SPORTS','bong (1).jpg'),
(18,'Nike Phantom GX Elite FG United Pack',7,24,'600000','349000','N-SPORTS','giaysannhantao (1).jpg'),
(19,'Ao Bong Da Real Madrid san nha 2024-2025',6,21,'300000','149000','N-SPORTS','real (2).webp'),
(31,'Adidas Cushioned SPW Crew Socks 3Pairs Unisex',10,31,'350000','310000','N-Sport','tat-vo-2.jpg'),
(32,'Carbon Fiver Ultralight 4U 80-84g Badminton Racket',10,32,'3800000','3000000','Carbon Fiver Ultralight 4U 80-84g Badminton Racket 28-30LBS Professional Offensive Type Racquet Strung Rackets with Bags','vot-3.jpg'),
(34,'Giay da bong Nike Phantom Luna II Academy TF Mad',7,24,'2350000 ','2000000 ','Nike Phantom Luna II Academy TF Mad Voltage','giay1.webp'),
(35,'Giay Ä‘a bong NMS Victory TF - Violet/Blue',7,25,'559000','490000','NMS Victory TF - Violet/Blue','giÃ y 3.webp'),
(36,'Giay da bong X MUNICH PRISMA 25 VERDE - Solar',7,22,'1500000','1200000','X MUNICH PRISMA 25 VERDE - Solar Yellow/Grey 3116025','giay fusal4.webp'),
(37,'Giay da bong X MUNICH ONE indoor 52 - Royal',7,22,'1200000','1000000','X MUNICH ONE indoor 52 - Royal Blue/White 3071052','fusal1.webp'),
(38,'Giay da bong Nike Tiempo Legend 9 Pro IC Blast',7,22,'2000000','1500000','Nike Tiempo Legend 9 Pro IC Blast - White/Black/Baltic Blue/Pink Blast DA1183-146','1.webp'),
(39,'Giay da bong NMS CAPITAN TF - Yellow/Red',7,25,'659000','500000','NMS CAPITAN TF - Yellow/Red','ag3.webp'),
(40,'Giay cau long Taro TR024-2 Meta Funsi',8,26,'499000 ','399000','Giay cau long Taro TR024-2','cau1.webp'),
(41,'Giay cau long Kumpoo KH-D511',8,26,'850000','600000','Kumpoo KH-D511','cau3.webp'),
(42,'Giay Cau Long Kumpoo KH-D510',8,26,'900000','700000',' Kumpoo KH-D510','cau5.webp'),
(43,'Giay chay bo ASICS GEL-KAYANO 31 WIDE Nam',8,27,'4220000','3790000','ASICS GEL-KAYANO 31 WIDE Nam - 1011B869.001','cau7.webp'),
(44,'Giay chay bo ASICS GEL-EXCITE 10 Nam',8,27,'2200000','1700000','Giay chay bo ASICS GEL-EXCITE 10 Nam - 1011B600.009','cau10.webp'),
(46,'Ao ni chui dau Chelsea xanh 2016',9,28,'250000','160000','Ao ni chui dau Chelsea xanh 2016','cau17.png'),
(47,'Ao bong da khong logo Bentacur ',6,33,'275000','200000','Ao bong da khong logo Bentacur ','cau18.jpg'),
(48,'Ao bong da tu thiet ke FC xam phoi cam ',6,33,'235000','150000','Ao bong da tu thiet ke FC xam phoi cam ','cau19.jpg'),
(49,'Qua bong da Nike Football Premier League Club Elite',10,30,'1690000','1400000','Qua bong da Nike Football Premier League Club Elite - White/Bold Berry/Volt/Black FZ3130-100','cau20.webp'),
(51,'Bong da dong luc FIFA Quality Pro UHV 2.07 Galaxy',10,30,'1900000','1400000','Bong da dong luc FIFA Quality Pro UHV 2.07 Galaxy','cau26.webp'),
(52,'Vot cau long Yonex Nanoflare 001A 2024',10,32,'959000','762000','Vot cau long Yonex Nanoflare 001A 2024','cau28.webp'),
(53,'Vot cau long VNB Carbon Training 150g',10,32,'659000','500000','Vot cau long VNB Carbon Training 150g','cau31.webp'),
(54,'Bo 2 Doi Tat The Thao Lacoste Nam Co Thap',10,31,'478000','325000','Bo 2 Doi Tat The Thao Lacoste Nam Co Thap','cau37.webp'),
(55,'Tat The Thao Nike Everyday Cush Ankle',10,31,'480000','310000','Tat The Thao Nike Everyday Cush Ankle','cau38.png');
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product_img_desc`
--

DROP TABLE IF EXISTS `tbl_product_img_desc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_product_img_desc` (
  `product_id` int(11) NOT NULL,
  `product_img_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product_img_desc`
--

LOCK TABLES `tbl_product_img_desc` WRITE;
/*!40000 ALTER TABLE `tbl_product_img_desc` DISABLE KEYS */;
INSERT INTO `tbl_product_img_desc` VALUES
(9,'adidas.png'),
(9,'aokhoackvien.png'),
(9,'aokhoacmcden.jpg'),
(9,'bulbal.webp'),
(9,'coupon_1_img.webp'),
(9,'coupon_2_img.webp'),
(10,'list-1.jpg'),
(11,'sp1.1.jpg'),
(11,'sp1.2.jpg'),
(11,'sp1.3.jpg'),
(11,'sp1.4.jpg'),
(12,'ss_img_2.jpg'),
(12,'ss_img_3.jpg'),
(12,'ss_img_4.jpg'),
(12,'ss_img_5.jpg'),
(13,'adidas.png'),
(13,'list-7.jpg'),
(13,'list-8.jpg'),
(13,'logo-molten-icon-1.webp'),
(14,'1.jpg'),
(14,'2.jpg'),
(14,'3.jpg'),
(14,'4.jpg'),
(15,'mc1.jpg'),
(15,'mc2.jpg'),
(15,'mc3.jpg'),
(15,'mc4.png'),
(16,'bong (1).jpg'),
(16,'bong (2).jpg'),
(16,'bong (3).jpg'),
(16,'bong (4).jpg'),
(17,'aokhoacmc (1).png'),
(17,'aokhoacmc (2).png'),
(18,'giaysannhantao (1).jpg'),
(18,'giaysannhantao (2).jpg'),
(18,'giaysannhantao (3).webp'),
(18,'giaysannhantao (4).webp'),
(19,'real (1).webp'),
(19,'real (2).webp'),
(19,'real (3).webp'),
(19,'real (4).webp'),
(20,'totga (1).jpg'),
(20,'totga (1).webp'),
(20,'totga (2).webp'),
(20,'totga (3).webp'),
(21,'giaychaybo (1).webp'),
(21,'giaychaybo (2).webp'),
(21,'giaychaybo (3).webp'),
(21,'giaychaybo (4).webp'),
(22,'download.jpg'),
(22,'images.jpg'),
(23,'mu.jpg'),
(24,'giay tu nhien.jpg'),
(25,'giay tu nhien.jpg'),
(26,'giay tu nhien.jpg'),
(27,'giay tu nhien.jpg'),
(28,'giay tu nhien.jpg'),
(29,'giay tu nhien.jpg'),
(30,'giay tu nhien.jpg'),
(31,'TAT-VO-THE-THAO-BULBAL-ESSENTIAL.jpg'),
(31,'tat-vo-3.jpg'),
(31,'tat-vo-4.jpg'),
(32,'vot-1.jpg'),
(32,'vot-2.jpg'),
(32,'vot-4.jpg'),
(33,'giay1.webp'),
(34,'giay1.webp'),
(35,'giÃ y 4.jpg'),
(35,'giÃ y 3.webp'),
(36,'giay fusal4.webp'),
(36,'giay fusal3.webp'),
(36,'giay fusal2.webp'),
(36,'giay fusal1.webp'),
(37,'fusal4.webp'),
(37,'fusal3.webp'),
(37,'fusal2.webp'),
(37,'fusal1.webp'),
(38,'1.webp'),
(39,'ag3.webp'),
(39,'ag1.webp'),
(40,'cau1.webp'),
(40,'cau2.webp'),
(41,'cau3.webp'),
(41,'cau4.webp'),
(42,'cau5.webp'),
(42,'cau6.webp'),
(43,'cau7.webp'),
(43,'cau8.webp'),
(43,'cau9.webp'),
(44,'cau10.webp'),
(44,'cau11.webp'),
(44,'cau12.webp'),
(45,'cau16.png'),
(46,'cau17.png'),
(47,'cau18.jpg'),
(48,'cau19.jpg'),
(49,'cau20.webp'),
(49,'cau21.webp'),
(49,'cau22.webp'),
(50,'cau25.jpg'),
(51,'cau26.webp'),
(51,'cau27.webp'),
(52,'cau28.webp'),
(52,'cau29.webp'),
(52,'cau30.webp'),
(53,'cau31.webp'),
(53,'cau32.webp'),
(53,'cau33.webp'),
(53,'cau34.webp'),
(54,'cau37.webp'),
(55,'cau38.png'),
(55,'cau39.png'),
(55,'cau40.png');
/*!40000 ALTER TABLE `tbl_product_img_desc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ratings`
--

DROP TABLE IF EXISTS `user_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_ratings` (
  `user_id` int(111) NOT NULL,
  `product_id` int(111) NOT NULL,
  `rating` int(111) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ratings`
--

LOCK TABLES `user_ratings` WRITE;
/*!40000 ALTER TABLE `user_ratings` DISABLE KEYS */;
INSERT INTO `user_ratings` VALUES
(10,15,5),
(11,16,6),
(12,18,4),
(13,11,4),
(14,14,5),
(15,23,4);
/*!40000 ALTER TABLE `user_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `rule` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(13,'Nguyen Tat Ngoc','admin@gmail.com','$2y$10$n6OLHq0Sh/n1vY50QeW6K.4viXDMpD74wHGuk4KW509rbg1qC1v66','',1),
(14,'Nguyen Duc Thuc','thu@gmail.com','$2y$10$HQEdYJdG1i7FH5uW0ggn7.NJnzE10HDWQttqVL/iTStiY8Xua2L3C','DOgPOQJo6ZRCdtiEbbuhZetAOmgQKE',0),
(21,'Nguyen Van A','anhA@gmail.com','$2y$10$xAtC6EpDd6SMa/IKkI72dezg9YBE9MHv87R9YZHOv3Xz6sWgfxN5m','',0),
(22,'Thuc','thuccua222@gmail.com','$2y$10$a5CPyEM70uYTzS/Tfncpj.lozWyoeU9T8OKGpfyqSinEX6.wxszNu',NULL,0),
(24,'athu','at@gmail.com','$2y$10$nyliIMh5or1evNgfOcJx0OxkaW5NcUikOKXTRTRGlKW7mHQYu9CSO','0KIIhxqs8x8bvQ3l58G4TDBASh7Z7J',0),
(26,'ex','ex@gmail.com','$2y$10$AG/M/DIjsR7mgltxYWV3mu/IXFEhspWQWa9rkfrkJbJJh7.cBIWLi',NULL,0),
(27,'ex1','ex1@gmail.com','$2y$10$a2Zq8RGqmMC4KQEFBDO.cenARFsTHKlHOlSJM16Xq2b2NAwYI47ne','QKXwcxFp7XHC2R0wxbl3vO6XvPgUeU',0),
(28,'aaaaa','aaaa@gmail.com','$2y$10$6fGz7NXATXBS/gg2ypYVkeeF6CixRgeKykzDRdFHYAoG5pTuv5dVC','R2OFa9UU4zsgp1cDmFKuXrXbo6PZ6Z',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'web_nsport_db_data'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-08 19:49:47
