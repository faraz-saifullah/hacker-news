-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: hacker_news
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Current Database: `hacker_news`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hacker_news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hacker_news`;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commented_by` varchar(50) DEFAULT NULL,
  `post_title` text,
  `post_id` int DEFAULT NULL,
  `text` text,
  `posted_time` bigint DEFAULT NULL,
  `points` int DEFAULT '0',
  `parent_id` int DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `username_comment_index` (`commented_by`),
  KEY `post_comment_index` (`post_id`),
  KEY `comment_comment_index` (`parent_id`),
  KEY `comment_index` (`id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`commented_by`) REFERENCES `user` (`username`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (3,'faraz','Creating a new post for testing',2,'This is going to be my first Comment',1611531196392,0,0),(4,'user1','Creating a new post for testing',2,'This is going to be my first Comment',1611531196392,0,0),(5,'user1','Creating a new post for testing',1,'This is going to be my first Comment',1611531196392,0,0),(6,'user1','Creating a new post for testing',2,'This is going to be my first Comment',1611531196392,0,0),(7,'user1','Creating a new post for testing',2,'This is going to be my first Comment',1611531196392,0,3),(8,'faraz','Creating a new post for testing',1,'Adding first reply with backend',1612860694158,0,5),(9,'faraz','Creating a new post for testing',1,'This is the first comment added by backend',1612860903159,0,0),(10,'faraz','Creating third post for testing',3,'First comment on this post with backend',1612862687971,0,0),(11,'faraz','Creating third post for testing',3,'First thread',1612863367244,0,10),(12,'faraz','Creating third post for testing',3,'first comment on first thread',1612863390751,0,11),(13,'faraz','Creating third post for testing',3,'second comment on first thread\n\n',1612863929994,0,12),(14,'faraz','Creating third post for testing',3,'4th',1612864123976,0,13),(15,'faraz','Creating third post for testing',3,'5th',1612864595181,0,14),(16,'faraz','Creating third post for testing',3,'new comment',1612864794895,0,10),(17,'faraz','Creating third post for testing',3,'Adding another comment for fun',1612864815151,0,0),(18,'faraz','Creating third post for testing',3,'6th',1612864857795,0,15),(19,'faraz','Creating third post for testing',3,'12th',1612865043489,0,11),(20,'faraz','First post with backend connected',6,'new Comment',1612865112112,0,0),(21,'faraz','First post with backend connected',6,'another comment',1612865241097,0,0),(22,'faraz','First post with backend connected',6,'3rd comment',1612865387748,0,0),(23,'faraz','First post with backend connected',6,'4th comment',1612865436149,0,0),(24,'faraz','First post with backend connected',6,'5th comment',1612865628545,0,0),(25,'faraz','First post with backend connected',6,'6th comment',1612865704176,0,0),(26,'faraz','First post with backend connected',6,'8th',1612865779407,0,0),(27,'faraz','First post with backend connected',6,'10th',1612865859178,0,0),(28,'faraz','First post with backend connected',6,'11th',1612865885278,0,0),(29,'faraz','First post with backend connected',6,'first reply',1612865921372,0,20),(30,'faraz','First post with backend connected',6,'second reply',1612866156942,0,29),(31,'faraz','First post with backend connected',6,'10th reply',1612866249586,0,26),(32,'faraz','Creating a new post for testing',1,'another reply',1612866769301,0,8);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
INSERT INTO `favourite` VALUES (8,3,'faraz'),(2,3,'faraz'),(4,4,'faraz'),(5,5,'faraz'),(6,1,'user1'),(7,2,'user1'),(9,5,'faraz'),(10,7,'faraz');
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `username` varchar(50) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_favourite_index` (`username`,`post_id`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hidden`
--

DROP TABLE IF EXISTS `hidden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hidden` (
  `username` varchar(50) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_hidden_index` (`username`,`post_id`),
  CONSTRAINT `hidden_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `hidden_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hidden`
--

LOCK TABLES `hidden` WRITE;
/*!40000 ALTER TABLE `hidden` DISABLE KEYS */;
/*!40000 ALTER TABLE `hidden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `link` text,
  `points` int DEFAULT '0',
  `posted_by` varchar(50) DEFAULT NULL,
  `posted_time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_index` (`id`),
  KEY `username_post_index` (`posted_by`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Creating a new post for testing','www.google.com',0,'faraz',1611531196392),(2,'Creating second post for testing','www.linkedin.com',0,'faraz',1611531196392),(3,'Creating third post for testing','www.linkedin.com',2,'user1',1611531196392),(4,'Creating forth post for testing','www.facebook.com',0,'user1',1611531196392),(5,'Creating forth post for testing','www.gmail.com',0,'user1',1611531196392),(6,'First post with backend connected','www.google.com',0,'faraz',1612788560029),(7,'Second post with backend','www.github.com',0,'faraz',1612789035417);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upvote`
--

DROP TABLE IF EXISTS `upvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upvote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upvote`
--

LOCK TABLES `upvote` WRITE;
/*!40000 ALTER TABLE `upvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `upvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upvotes`
--

DROP TABLE IF EXISTS `upvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upvotes` (
  `username` varchar(50) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_upvote_index` (`username`,`post_id`),
  CONSTRAINT `upvotes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `upvotes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upvotes`
--

LOCK TABLES `upvotes` WRITE;
/*!40000 ALTER TABLE `upvotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `upvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `about` text,
  `time_created` bigint DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `user_index` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('faraz','pass123','I would like to change this about me section',1611058656793),('user1','pass123','I want to say things about me',1611058656793),('user2','pass123','I want to say things about me',1611058656793);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-09 18:57:04
