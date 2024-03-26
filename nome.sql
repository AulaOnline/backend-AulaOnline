-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: AulaOnline-Database
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `annotation`
--

DROP TABLE IF EXISTS `annotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annotation` (
  `annotation_id` int NOT NULL AUTO_INCREMENT,
  `tittle` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  PRIMARY KEY (`annotation_id`),
  KEY `FK_ae752a33c25b8bbb5e43b77a0b6` (`user_id`),
  KEY `FK_49c4f5d6dd0a7899c1bd9c79d1b` (`video_id`),
  CONSTRAINT `FK_49c4f5d6dd0a7899c1bd9c79d1b` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`),
  CONSTRAINT `FK_ae752a33c25b8bbb5e43b77a0b6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annotation`
--

LOCK TABLES `annotation` WRITE;
/*!40000 ALTER TABLE `annotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `annotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary` (
  `video_link` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  PRIMARY KEY (`video_link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john.doe@example.com','johnDoe','$2b$13$QjeBJvocTgvLWLAVrIFii.hmSaC/ycwkm5r/TafnCKQAcoRfXHMnW'),(2,'jane.smith@example.com','janeSmith','$2b$13$CCdPCLR643XC8NQpthaJVuF.3ANPWymHiGiX3SxwezuvwHuDCdHh2'),(3,'william.johnson@example.com','willJohnson','$2b$13$A9IoTwqtxFLAnouva7dA8ec3KGOo73wng5Afb90VY2397WxTJC8Je'),(4,'sarah.brown@example.com','sarahBrown','$2b$13$DldsyLOlucaZ6Vojoz5ceeBfmVhc97HSFInYspOvRB3i5ImLCws4K'),(5,'michael.davis@example.com','mikeDavis','$2b$13$BzcYBKHFqh0pOD8OribZ7.fmlZftz0n8pTiXUegHJ1Kr2bsF5JuWq'),(6,'emily.wilson@example.com','emilyWilson','$2b$13$okRKA4yHJuLT1GPuAISAS.iqK01ogBJfIxPik2Yp1ORelKHt5Atay'),(7,'david.martinez@example.com','daveMartinez','$2b$13$L7OA.x29YTTOSwcbFNYuoO59yrCjWUBwxnDQDlCr/hIJuaGO2KkxC'),(8,'jessica.taylor@example.com','jessTaylor','$2b$13$CSZ9mQCuJZeZJ5Eafynbjer.YwKyun/WJUBFKPA9vzJcv5OdciYkq'),(9,'james.thomas@example.com','jamesThomas','$2b$13$jlnrsYQEZ7OhBSw2mKWuJ.BXdrzlQzo9a32CP0cupBKXvxaCMG0SC'),(10,'linda.anderson@example.com','lindaAnderson','$2b$13$z4ugl5DpJwHpX8SSdmNeh.dWjqDg99kZ4PjqkcFZUpePd1sP5Zw5G'),(11,'charles.lee@example.com','charlieLee','$2b$13$y.sWVh5AXspUcewPqPqqeeK/tuG2wJHbjgqG1wqwgwy/uoDomIrge'),(12,'angela.white@example.com','angelaWhite','$2b$13$R.umIrkU8OJAXwh00vyjFeWz4I4RO9iNpyIKsdmeen5IlpnUfiZT6'),(13,'george.harris@example.com','georgeHarris','$2b$13$Tf0nizseJ7gkCNSI97maIek/d0eMukw1y.eOBM13xrWIam6EkxvIu'),(14,'karen.clark@example.com','karenClark','$2b$13$p/kIc0uouA7zncMV/RUmv.NNiKrg/2d60FyFtkLue0p7Ygqx8di4.'),(15,'steven.lewis@example.com','steveLewis','$2b$13$8ccKnRPPWXq11bUKDLgDYOu6KUyrn/1N08BoIoIFY6WcrQC8Mkr6q'),(16,'donna.robinson@example.com','donnaRobinson','$2b$13$FG7VdLsYPpbLRcQZXvgi2OlTPi0TKcE9zFcze1LSD4S3oJg1Lm/Iq'),(17,'brian.walker@example.com','brianWalker','$2b$13$5EiVApEfwYrkcD3qQ4ElYu.M.xrFme1zUWQneUVagBOrggD8NGxYy'),(18,'nancy.allen@example.com','nancyAllen','$2b$13$lRDox8JXFd1x0ZssoPC8geyX60TZKuzA6pE3etWXSXoRkQB.jnSJi'),(19,'gary.young@example.com','garyYoung','$2b$13$qgcFen4.FQG8cDFMBZPBTO8Xopqp5.Y2wIXA8vIsz5jlEut/srpxy'),(20,'susan.hall@example.com','susanHall','$2b$13$mpGWEVPSGTF4/JzKI9IFN.DSpTfMNWMcIzIC9aUYqXFt4FEtpMi2m'),(21,'elizabeth.moore@example.com','lizMoore','$2b$13$5MpVz96GkhcTL7TRdc7WiuELydRATBpiKrSegZc5QOAYRlXT2uOa6'),(22,'daniel.king@example.com','danielKing','$2b$13$RnFzHJWr9n/ubT3qeqRi..2mEoVi64DWtwrYVNRxHK4RZKHuRRJz2'),(23,'patricia.wright@example.com','patriciaWright','$2b$13$boqSJFY9/QADKMZn8vLsteVv2ONb2tvNTrEoElDKYeKS8njd1Jn3a'),(24,'mark.miller@example.com','markMiller','$2b$13$4RI4vMkSUQ3Y5hLAOnkUo.jmDJqx3witprLP.Sf62TbQQ42vW0Dze'),(25,'jennifer.lopez@example.com','jenniferLopez','$2b$13$ETzMEuwtiGkMFkF4C21wCe/4aaTZg.YCA6F3PuP8EoDNYFk1lkjKq'),(26,'matthew.hill@example.com','matthewHill','$2b$13$.tQc3ebWBG84Ld7udBJdseJb4I716DC31VMw7PPrRaaRNuIGPgN7K'),(27,'sandra.scott@example.com','sandraScott','$2b$13$5HAnEZiJGUkZxZCix7oBuOtFPi1De8UG33mlQJwaNNheH3j6K8G.O'),(28,'christopher.green@example.com','chrisGreen','$2b$13$3xpUzI1dtqc3gZ8r/qB/JONhnSsZXj6P59S6KGdqvWIn54pg72Axm'),(29,'melissa.lewis@example.com','melissaLewis','$2b$13$1wuz6bM2XBfojtNyB4MW6.S/igrDQVIe8aTR4et9XRKR0H1R2Y5ze'),(30,'joshua.walker@example.com','joshWalker','$2b$13$Z25kd0w2qipFixH6qEiL0.Nge67fr2ZOOjpwThkiEgv5eK9Wtdabu'),(31,'ashley.hall@example.com','ashleyHall','$2b$13$RZabC7KBdWFQwbax8xuYPOZB.HLwwLr2wS8N9pfwxLMWwfsD1LCOy'),(32,'kevin.wright@example.com','kevinWright','$2b$13$ogEYNlIhtzBtCQg9H9lTq.E3V4m4HNyjtHqtKKxNUrW17b9FqoZPS'),(33,'megan.clark@example.com','meganClark','$2b$13$5dN.my/YmknEBFdIdFKm8emULK6/Bbz/NXQa0I2k2s2.igjMRfzdi'),(34,'brian.martinez@example.com','brianMartinez','$2b$13$gkhXWvc5dVorpeJMZNaVrOsEr13Ruz7VQ4BVI959XBlIw18DX6u1q'),(35,'sophia.anderson@example.com','sophiaAnderson','$2b$13$fUCl4oTjOLTnD/BTokourug4jUG0riN23nAajFBO.K7cb0QbJsQMq'),(36,'jason.thomas@example.com','jasonThomas','$2b$13$nmLwDiOp9C2lS7Ooyxen0eiWFtJQkRech..cRwJ.6AuY63pDvv6dm'),(37,'amanda.jackson@example.com','amandaJackson','$2b$13$OqlijvfqFd9a3SdDPC2Heuy72lCLMyJ2wXoG4KSfDWdr7MNe9wjR.'),(38,'ryan.white@example.com','ryanWhite','$2b$13$mQRob2J6BqicfIRPgYV4ru3s7a1nCdAOTR/5gi5Jgd2CkXmG5cskW'),(39,'justin.harris@example.com','justinHarris','$2b$13$Su5h.h6xBY1KiBKmgsoiPOGHJwmCjxEbX/UVFoIEq2rsLYkeHCaMq'),(40,'nicole.brown@example.com','nicoleBrown','$2b$13$5UgWAIm3zmsCPK2K0Lpdfu4Xx4mtXmRqdQh7bWDkVyOMDHBfclB8G');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `total_time` int NOT NULL,
  `watched_time` int DEFAULT NULL,
  `video_link` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `FK_0c06b8d2494611b35c67296356c` (`user_id`),
  CONSTRAINT `FK_0c06b8d2494611b35c67296356c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25 17:16:47
