-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 10, 2021 at 06:38 PM
-- Server version: 5.7.33
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `littlefa_4537_term_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `advice`
--

CREATE TABLE `advice` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `advice`
--

INSERT INTO `advice` (`id`, `message`, `source`) VALUES
(1, 'lmaooo        ', 'asd'),
(2, 'Drink 200% sugar boba', 'ff1'),
(3, '123', 'ff');

-- --------------------------------------------------------

--
-- Table structure for table `blood_pressure`
--

CREATE TABLE `blood_pressure` (
  `id` int(11) NOT NULL,
  `systolic` double NOT NULL,
  `diastolic` double NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blood_pressure`
--

INSERT INTO `blood_pressure` (`id`, `systolic`, `diastolic`, `date`, `uid`) VALUES
(1, 69, 69, '2021-04-10 15:12:22', 16),
(5, 34, 34, '2021-04-10 16:19:34', 20),
(3, 23, 23, '2021-04-10 16:12:57', 20),
(7, 123, 123, '2021-04-10 18:33:24', 8);

-- --------------------------------------------------------

--
-- Table structure for table `endpoints`
--

CREATE TABLE `endpoints` (
  `id` int(11) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `endpoints`
--

INSERT INTO `endpoints` (`id`, `endpoint`, `method`, `count`) VALUES
(1, '/user/login', 'POST', 1),
(0, '/user/signup', 'POST', 0),
(2, '/user/admin', 'POST', 1),
(3, '/bloodPressure/advice', 'POST', 1),
(4, '/bloodPressure', 'DELETE', 1),
(5, '/user', 'DELETE', 0),
(6, '/admin', 'GET', 1),
(7, '/bloodPressure/view', 'GET', 7),
(8, '/bloodPressure/advice', 'GET', 5),
(9, '/bloodPressure', 'PUT', 1),
(10, '/user', 'PUT', 1),
(11, '/bloodPressure', 'POST', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `isAdmin`) VALUES
(7, '12', '12', 0),
(17, 'qwe', 'qwe', 0),
(8, 'ff', '123', 0),
(9, 'ff1', 'ff', 0),
(13, 'ff2', 'ff', 0),
(20, 'asd', '123', 0),
(19, 'asd1', 'asd1', 0),
(21, 'admin', 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advice`
--
ALTER TABLE `advice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blood_pressure`
--
ALTER TABLE `blood_pressure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `endpoints`
--
ALTER TABLE `endpoints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advice`
--
ALTER TABLE `advice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blood_pressure`
--
ALTER TABLE `blood_pressure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
