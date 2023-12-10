-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 31 mars 2023 à 23:55
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cooldown`
--

-- --------------------------------------------------------

--
-- Structure de la table `follower`
--

CREATE TABLE `follower` (
  `id_users` int(255) NOT NULL,
  `id_followers` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `follower`
--

INSERT INTO `follower` (`id_users`, `id_followers`) VALUES
(3, 1),
(3, 2),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 9),
(3, 10),
(3, 11),
(3, 13),
(4, 2),
(5, 2),
(6, 1),
(6, 2),
(7, 3),
(8, 2),
(9, 2),
(9, 5),
(9, 8),
(10, 1),
(10, 5),
(10, 6),
(10, 9),
(12, 2),
(12, 3),
(12, 4),
(12, 6),
(13, 1),
(13, 2),
(13, 3),
(13, 6);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id_tweet` int(255) NOT NULL,
  `id_users` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_tweet`, `id_users`) VALUES
(1, 2),
(1, 3),
(1, 4),
(4, 4),
(4, 5),
(5, 8),
(8, 3),
(10, 3),
(11, 4),
(14, 3),
(14, 4),
(15, 3),
(18, 3),
(18, 5),
(18, 6),
(18, 8),
(18, 9),
(18, 11),
(18, 12),
(22, 6),
(23, 7),
(25, 9),
(25, 12),
(27, 10),
(27, 11),
(28, 11),
(29, 11),
(29, 12),
(31, 12);

-- --------------------------------------------------------

--
-- Structure de la table `mp`
--

CREATE TABLE `mp` (
  `id_users` int(255) NOT NULL,
  `id_receveur` int(255) NOT NULL,
  `id_mp` int(255) NOT NULL,
  `contenu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `retweet`
--

CREATE TABLE `retweet` (
  `id_tweet` int(255) NOT NULL,
  `id_users` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `retweet`
--

INSERT INTO `retweet` (`id_tweet`, `id_users`) VALUES
(1, 2),
(4, 4),
(8, 3),
(14, 3),
(14, 4),
(18, 3),
(18, 6),
(18, 8),
(18, 9),
(18, 11),
(18, 12),
(23, 7),
(25, 9),
(25, 12),
(31, 12);

-- --------------------------------------------------------

--
-- Structure de la table `tsession`
--

CREATE TABLE `tsession` (
  `token` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `issueAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tweet`
--

CREATE TABLE `tweet` (
  `id_tweet` int(255) NOT NULL,
  `contenu` varchar(400) COLLATE utf8mb4_bin NOT NULL,
  `id_users` int(255) NOT NULL,
  `reponses` tinyint(1) NOT NULL DEFAULT 0,
  `id_tweet_rep` int(255) DEFAULT NULL,
  `timetweet` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `tweet`
--

INSERT INTO `tweet` (`id_tweet`, `contenu`, `id_users`, `reponses`, `id_tweet_rep`, `timetweet`) VALUES
(1, 'First', 1, 0, NULL, '2023-03-31 19:19:47'),
(2, 'Second', 1, 0, NULL, '2023-03-31 19:19:52'),
(3, 'Troisième', 1, 0, NULL, '2023-03-31 19:19:55'),
(4, 'Il y aura un retard de 2h30 sur la ligne P, veuillez nous excuser pour la gêne occasionée', 2, 0, NULL, '2023-03-31 19:21:59'),
(5, 'La ligne K aussi *\n', 2, 0, NULL, '2023-03-31 19:22:12'),
(6, 'Le RER B aussi', 2, 1, 5, '2023-03-31 19:22:20'),
(7, 'En fait y\'as du retard partout', 2, 1, 6, '2023-03-31 19:22:30'),
(8, 'Je kiff Frigiel je sais pas vous', 3, 0, NULL, '2023-03-31 19:23:40'),
(9, 'C\'est vraiment un goat ce type', 3, 1, 8, '2023-03-31 19:23:52'),
(10, 'Je crois jsuis amoureuse ...', 3, 1, 9, '2023-03-31 19:24:00'),
(11, 'Masterclass mon pseudo\n', 4, 0, NULL, '2023-03-31 19:25:31'),
(12, 'De ouf', 4, 1, 8, '2023-03-31 19:25:37'),
(13, '(non)', 4, 1, 11, '2023-03-31 19:25:56'),
(14, 'EST-CCCCCEEEEEEE QUE C\'EST BON POUR VOUSSSS ????', 4, 1, 13, '2023-03-31 19:26:13'),
(15, 'OMG SQUEEZIE QUI ME REPOND ???', 3, 1, 12, '2023-03-31 19:27:28'),
(16, 'JVAIS CREER UN DEUXIEME COMPTE SQUEEZIELEGOAT', 3, 1, 15, '2023-03-31 19:27:40'),
(17, 'Tout ça pour la retraite ....', 5, 1, 4, '2023-03-31 19:28:48'),
(18, 'Ratio ?', 5, 1, 1, '2023-03-31 19:28:58'),
(19, 'NAAAAN MON COURS DE PONEY ... ', 3, 1, 6, '2023-03-31 19:30:02'),
(20, 'OUI SQUEEZIE C BON POUR MOI', 3, 1, 14, '2023-03-31 19:30:18'),
(21, 'Une fois j\'ai volé un helicopter à l\'armée de l\'air', 6, 0, NULL, '2023-03-31 19:30:42'),
(22, 'C\'est grâce a moi si Squeezie à trouvé son pseudo :)', 6, 1, 11, '2023-03-31 19:30:58'),
(23, 'Make america great again *faut le lire avec un accent biieeeeeeen*', 7, 0, NULL, '2023-03-31 19:32:15'),
(24, 'FLOP', 7, 1, 18, '2023-03-31 19:32:48'),
(25, 'Donald Trump à tenté de ratio Macron ... C\'est un flop ...', 8, 0, NULL, '2023-03-31 19:34:16'),
(26, 'On l\'as dit avant sur Facebook, après c\'est pas un compétition', 9, 1, 25, '2023-03-31 19:36:04'),
(27, 'GROSSE NOUVEAUTER SUR LA FAILLE PROCHAIN PATCH', 10, 0, NULL, '2023-03-31 19:37:21'),
(28, 'nn je dehek', 10, 1, 27, '2023-03-31 19:37:26'),
(29, 'HI HI HI AH ', 11, 0, NULL, '2023-03-31 19:39:45'),
(30, 'comme d\'hab', 11, 1, 28, '2023-03-31 19:39:55'),
(31, '<<<< Macron', 11, 1, 24, '2023-03-31 19:40:20'),
(32, 'COUCOU', 12, 0, NULL, '2023-03-31 19:40:52'),
(33, 'grosse dépression ...', 13, 1, 28, '2023-03-31 23:32:15');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_users` int(255) NOT NULL,
  `pseudo` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `nom` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `prenom` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `date_creation` date NOT NULL DEFAULT current_timestamp(),
  `bio` varchar(250) COLLATE utf8mb4_bin DEFAULT 'Salut les Cooldowners 8D',
  `temps_restant` int(11) NOT NULL DEFAULT 60,
  `blocage` tinyint(1) NOT NULL DEFAULT 0,
  `last_connect` datetime DEFAULT NULL,
  `profil` longtext COLLATE utf8mb4_bin NOT NULL DEFAULT 'cooldown.png',
  `etat` tinyint(2) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_users`, `pseudo`, `email`, `password`, `nom`, `prenom`, `date_creation`, `bio`, `temps_restant`, `blocage`, `last_connect`, `profil`, `etat`) VALUES
(1, 'DarkSlayer64', 'jordan@gmail.com', '$2y$10$l4gNN6jOLb8WRtU4Uv5Hbee817wxpWCj0o8y1MCKRC50GEzuq0wvu', 'jordan', 'jordi', '2023-03-31', 'Salut les Cooldowners 8D', 57, 0, '2023-03-31 19:20:33', 'ppfortnite.jpeg', 0),
(2, 'SNCF', 'sncf@yahoo.com', '$2y$10$tWAYTcFNXmiZqb3dXuYmReIv4q5MeA/fE0K.nQ3VzeJq1S806XgKq', 'directeur', 'marketing', '2023-03-31', 'Salut les Cooldowners 8D', 58, 0, '2023-03-31 19:22:35', 'SNCF.jpg', 1),
(3, 'FrigielLeGoat', '1234@gmail.com', '$2y$10$UgNf8h4L5LNdS1Wk0spxIO/txjYth1XUes3o1J9jIABVkSsMHKZsO', 'sanchez', 'benedicte', '2023-03-31', 'FRIGIEL > SIPHANO CETTE FRAUDE', 26, 0, '2023-03-31 23:47:27', 'cooldown.png', 2),
(4, 'Squeezizi', 'squeezie@gmail.com', '$2y$10$QS1WHjOFd40cE1YRd5ael.t/kNRhYVF.Xv412DHyPoPbvrpy4xqhK', 'Hauchard', 'Lucas', '2023-03-31', 'En live tout les jours a 18h tsais le mec qui se fait passer pour squeeize mais qui connait pas de ouf le youtubeur mais trkl au moins on a la santé et sinn vous ça va tsé le mec qui fait ze3ma il parle tout seul', 58, 0, '2023-03-31 19:27:05', 'squeezie.jpeg', 2),
(5, 'Emmanuel Macron', 'france@gmail.com', '$2y$10$GqPkJTS0Xha.9wsTxztMCuWvCDy/3KTSK46/URpIigib3k1KTW.wm', 'macron', 'emmanuel', '2023-03-31', 'Salut les Cooldowners 8D', 59, 0, '2023-03-31 19:29:09', 'macron.jpeg', 1),
(6, 'Oussama', '12345@gmail.com', '$2y$10$i4rHGwzqaMuRl322r0k4C.m4hbqj/kdtl7wt1nV.s1Q/zI4JsmteG', 'ammar', 'oussama', '2023-03-31', 'Salut les Cooldowners 8D', 59, 0, '2023-03-31 19:31:18', 'ouss.jpeg', 2),
(7, 'Donald Trump', 'us@gmail.com', '$2y$10$PEAnr5da/tR9L5pSqhW82e6S2mgflLR3xOljGmzgScnM72a4BM51m', 'Trump', 'Donald', '2023-03-31', 'Salut les Cooldowners 8D', 58, 0, '2023-03-31 19:32:52', 'cooldown.png', 2),
(8, 'Le Monde', 'lemonde@gmail.com', '$2y$10$CMzao4OtfM/Ptu.RnfI1U.JJRsEiNzSp2XhYqllehb/EeO5yHxuH2', 'Le', 'monde', '2023-03-31', 'Salut les Cooldowners 8D', 58, 0, '2023-03-31 19:34:54', 'lmonde.jpeg', 0),
(9, 'LE FIGARO', 'lefigaro@gmail.com', '$2y$10$0VDrFVjmQC.ul59vRiGtlu24Sx.9RUzmaz59OntUkaDBTxGW9Quee', 'le', 'figaro', '2023-03-31', 'Salut les Cooldowners 8D', 58, 0, '2023-03-31 19:36:34', 'lfigaro.jpeg', 2),
(10, 'RIOT GAMES', 'riot@gmail.com', '$2y$10$nSFJFKZ0g0NxL18dmTNoleTkNTzn3DvvB9so.X.I22J.HEAoEwiaC', 'rito', 'games', '2023-03-31', 'Salut les Cooldowners 8D', 59, 0, '2023-03-31 19:37:48', 'riot games.png', 1),
(11, 'SUPERCELL', 'supercell@gmail.com', '$2y$10$Xa0flAHTqVF.ykAtQmAsGuRXB/9JRrxOcLqsUnAcbVSRet7hX3VJa', 'super', 'cell', '2023-03-31', 'Salut les Cooldowners 8D', 59, 0, '2023-03-31 19:40:22', 'supercell.png', 0),
(12, 'miss jirachi', 'miss@gmail.com', '$2y$10$kBALgskRkZid8cqeCE.VweAWKfYdU/efgL/DCP/iU6LcYkrQqf.z.', 'miss', 'jirachi', '2023-03-31', 'David me manque ...', 52, 0, '2023-03-31 23:30:51', 'missj.jpeg', 0),
(13, 'evian', 'evian@gmail.com', '$2y$10$eFE/VgWGTsJ36uhZP57QReuyGE02YLiLt7jstaZpIcPMNRRMbNTpy', 'ev', 'ian', '2023-03-31', 'Salut les Cooldowners 8D', 59, 0, '2023-03-31 23:32:28', 'evian.jpeg', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`id_users`,`id_followers`),
  ADD KEY `fk_users_users2` (`id_followers`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_tweet`,`id_users`),
  ADD KEY `fk_like_iduser` (`id_users`);

--
-- Index pour la table `mp`
--
ALTER TABLE `mp`
  ADD PRIMARY KEY (`id_mp`),
  ADD KEY `fk_mp_users` (`id_users`),
  ADD KEY `fk_mp_receveur` (`id_receveur`);

--
-- Index pour la table `retweet`
--
ALTER TABLE `retweet`
  ADD PRIMARY KEY (`id_tweet`,`id_users`),
  ADD KEY `fk_retweet_users` (`id_users`);

--
-- Index pour la table `tsession`
--
ALTER TABLE `tsession`
  ADD PRIMARY KEY (`token`),
  ADD KEY `FK_TOKEN_USER` (`userId`);

--
-- Index pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD PRIMARY KEY (`id_tweet`),
  ADD KEY `fk_tweet_users` (`id_users`),
  ADD KEY `fk_idtweet_rep` (`id_tweet_rep`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mp`
--
ALTER TABLE `mp`
  MODIFY `id_mp` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tweet`
--
ALTER TABLE `tweet`
  MODIFY `id_tweet` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `fk_users_users` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_users2` FOREIGN KEY (`id_followers`) REFERENCES `users` (`id_users`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_idtweet_tweet` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_like_iduser` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE;

--
-- Contraintes pour la table `mp`
--
ALTER TABLE `mp`
  ADD CONSTRAINT `fk_mp_receveur` FOREIGN KEY (`id_receveur`) REFERENCES `users` (`id_users`),
  ADD CONSTRAINT `fk_mp_users` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`);

--
-- Contraintes pour la table `retweet`
--
ALTER TABLE `retweet`
  ADD CONSTRAINT `fk_retweet_tweet` FOREIGN KEY (`id_tweet`) REFERENCES `tweet` (`id_tweet`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_retweet_users` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`);

--
-- Contraintes pour la table `tsession`
--
ALTER TABLE `tsession`
  ADD CONSTRAINT `FK_TOKEN_USER` FOREIGN KEY (`userId`) REFERENCES `users` (`id_users`) ON DELETE CASCADE;

--
-- Contraintes pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD CONSTRAINT `fk_idtweet_rep` FOREIGN KEY (`id_tweet_rep`) REFERENCES `tweet` (`id_tweet`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
