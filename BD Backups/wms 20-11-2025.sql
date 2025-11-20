-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2025 a las 19:47:12
-- Versión del servidor: 11.8.3-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wms`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `auth_group`
--

INSERT INTO `auth_group` (`id`, `name`) VALUES
(1, 'Administrador'),
(3, 'Operador'),
(2, 'Supervisor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `auth_group_permissions`
--

INSERT INTO `auth_group_permissions` (`id`, `group_id`, `permission_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17),
(18, 1, 18),
(19, 1, 19),
(20, 1, 20),
(21, 1, 21),
(22, 1, 22),
(23, 1, 23),
(24, 1, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_customuser'),
(22, 'Can change user', 6, 'change_customuser'),
(23, 'Can delete user', 6, 'delete_customuser'),
(24, 'Can view user', 6, 'view_customuser');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-11-13 22:38:18.908061', '8', '{\"id\": 8, \"name\": \"sdds\", \"last_name\": \"sdds\", \"email\": \"sadsa@sdsd.cl\", \"area\": \"sdsd\", \"is_active\": false}', 1, '[{\"added\": {}}]', 6, 7),
(2, '2025-11-15 22:30:49.291705', '6', '{\"id\": 6, \"name\": \"\", \"last_name\": \"\", \"email\": \"test2@test.cl\", \"area\": null, \"is_active\": false}', 2, '[{\"changed\": {\"fields\": [\"Is active\"]}}]', 6, 7),
(3, '2025-11-15 22:31:32.092860', '6', '{\"id\": 6, \"name\": \"\", \"last_name\": \"\", \"email\": \"test2@test.cl\", \"area\": null, \"is_active\": true}', 2, '[{\"changed\": {\"fields\": [\"Is active\"]}}]', 6, 7),
(4, '2025-11-15 22:59:40.806715', '6', '{\"id\": 6, \"name\": \"\", \"last_name\": \"\", \"email\": \"test2@test.cl\", \"area\": null, \"is_active\": true}', 2, '[{\"changed\": {\"fields\": [\"Groups\"]}}]', 6, 7),
(5, '2025-11-15 23:00:05.401634', '6', '{\"id\": 6, \"name\": \"\", \"last_name\": \"\", \"email\": \"test2@test.cl\", \"area\": null, \"is_active\": true}', 2, '[]', 6, 7),
(6, '2025-11-15 23:00:19.698153', '1', 'Administrador', 2, '[{\"changed\": {\"fields\": [\"Permissions\"]}}]', 3, 7),
(7, '2025-11-15 23:19:39.176685', '8', '{\"id\": 8, \"name\": \"sdds\", \"last_name\": \"sdds\", \"email\": \"sadsa@sdsd.cl\", \"area\": \"sdsd\", \"is_active\": false}', 3, '', 6, 7),
(8, '2025-11-16 19:25:47.652428', '9', '{\"id\": 9, \"name\": \"testin\", \"last_name\": \"testeado\", \"email\": \"test3@test.cl\", \"area\": \"ninguna\", \"is_active\": true}', 1, '[{\"added\": {}}]', 6, 7),
(9, '2025-11-16 20:22:19.531352', '9', '{\"id\": 9, \"name\": \"testin\", \"last_name\": \"testeado\", \"email\": \"test3@test.cl\", \"area\": \"ninguna\", \"is_active\": true}', 2, '[]', 6, 7),
(10, '2025-11-16 20:25:45.053044', '9', '{\"id\": 9, \"name\": \"testin\", \"last_name\": \"testeado\", \"email\": \"test3@test.cl\", \"area\": \"ninguna\", \"is_active\": true}', 2, '[]', 6, 7),
(11, '2025-11-16 20:26:51.308335', '14', '{\"id\": 14, \"name\": \"testin\", \"last_name\": \"super\", \"email\": \"test1@test.cl\", \"area\": \"asas\", \"is_active\": true}', 1, '[{\"added\": {}}]', 6, 7),
(12, '2025-11-16 21:09:17.942356', '15', '{\"id\": 15, \"name\": \"Diego\", \"last_name\": \"Fuentes\", \"email\": \"diego18.df@gmail.com\", \"area\": null, \"is_active\": true}', 2, '[{\"changed\": {\"fields\": [\"Password\"]}}]', 6, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(6, 'loginApp', 'customuser'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-11-12 00:32:23.803305'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-11-12 00:32:23.904574'),
(3, 'auth', '0001_initial', '2025-11-12 00:32:24.227823'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-11-12 00:32:24.284776'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-11-12 00:32:24.290654'),
(6, 'auth', '0004_alter_user_username_opts', '2025-11-12 00:32:24.296521'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-11-12 00:32:24.302197'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-11-12 00:32:24.305790'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-11-12 00:32:24.312326'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-11-12 00:32:24.318212'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-11-12 00:32:24.323931'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-11-12 00:32:24.365698'),
(13, 'auth', '0011_update_proxy_permissions', '2025-11-12 00:32:24.372753'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-11-12 00:32:24.379189'),
(15, 'loginApp', '0001_initial', '2025-11-12 00:32:24.756422'),
(16, 'admin', '0001_initial', '2025-11-12 00:32:24.890644'),
(17, 'admin', '0002_logentry_remove_auto_add', '2025-11-12 00:32:24.898521'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2025-11-12 00:32:24.907573'),
(19, 'sessions', '0001_initial', '2025-11-12 00:32:24.972650'),
(20, 'loginApp', '0002_rename_rutid_customuser_rut', '2025-11-12 00:50:11.020841'),
(21, 'loginApp', '0003_alter_customuser_date_joined_and_more', '2025-11-12 01:39:35.801061'),
(22, 'loginApp', '0004_alter_customuser_managers_alter_customuser_groups', '2025-11-15 23:01:40.232457');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('0q4rkaeocvdudcd6oruj04xttjugwc0n', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiW4:c4M9q6RFY4MYSIigOLKyYuGUbT87l2BrYbNf1eL4ZZY', '2025-11-30 19:34:28.077995'),
('0s3zimcn9pv0fofu6wkz84g3n9wshjhy', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKlMo:zhM_Buolzx7P4usZb-0cgFnJRx47TmyT05yi8yhQjNw', '2025-11-30 22:37:06.628973'),
('0z7m5sfmt3qf2xp21calinnj3ebycw9l', 'e30:1vKOgG:HC0RjUI31ImHv5j3sIlPFqBWft0DRZm_lR_e_cyPHQo', '2025-11-29 22:23:40.021033'),
('13x9ov6u2qi6xtsoqskqf2bdg3y4lg9d', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhYA:PLuihkf2tIzEvH2h9mUPR3WPV4kXa9yUh39QDaXGxRg', '2025-11-30 18:32:34.244447'),
('15nbfncbpj0tfdizyu71wl4tjvd5hzgq', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhf0:WBRhiAiI8jFJDN1_89X3P_Vm-NKHK9zZdq8nRZsHSMU', '2025-11-30 18:39:38.656661'),
('1ur41cwea6sr4oxd79t8ybpknalnkr0e', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKicN:y2L8gt5k2PDSg2Iinw8Y7p7uSBzIHyITmfgYLt2xV1o', '2025-11-30 19:40:59.090949'),
('2zvg06jcmthyami693b1h8c3y316rjcg', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkQr:3UzfA-X0eeXSqeNPxgbdTevBOiAZmnepivun8nxM1Kw', '2025-11-30 21:37:13.969431'),
('30ydxzftujdpb7751odinefan0cuon3p', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiTO:8bzebBl5qpDISqliMtVaKLUCxYJFV14VMfx0M1HavAQ', '2025-11-30 19:31:42.811168'),
('3ugutncpixadtu5d61s8ojr9g13dtb5d', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKknj:eGWe1XU0JarfiLeyvDFz0p0rJEE7E4Hsd-_42qdmmmk', '2025-11-30 22:00:51.866881'),
('3y0diyn6xu238xxfqv3excq9fh1r3i98', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQEg:2W-ozMRITinR6l5SRFYScB4HZ9iaD7KW0hnpTMez7KI', '2025-11-30 00:03:18.637457'),
('44oeimmwyovdmetfmprdq2fu2qsk5fiw', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQFi:ych00GviLhqxqZPerzgF4Fr5OcQlAxLN_8p7Q9rkAoU', '2025-11-30 00:04:22.397284'),
('4jvio45prvy3719l7soeijetuad5aj6w', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKOcN:Jhnogff1zNlqPRGvT1RZrIk9wqbinvXDbxaTvqUZM4I', '2025-11-29 22:19:39.035729'),
('4xxqjvbnl1vhocg46i27qvrxvcpvekg5', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkQt:6k4pHFwW_KZgm6Uu-iZlGF2-qD56xjghR5vWWvvXFS4', '2025-11-30 21:37:15.308053'),
('4yfu0oyorefjln2itie0bs8j5palhwjy', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKlLk:fpy8hqiLkOTybeFExEyqkzw08FXF5eI-LdPGk5A5ZK8', '2025-11-30 22:36:00.900681'),
('4z0059u052bgjxrd3ldj4ehhi0jfwng4', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQF9:lTvq_NkVamu35ykxbT6tF6XiAJRP4uYhPIpxgOFu1dQ', '2025-11-30 00:03:47.832021'),
('5ya0donmmq7n3uawinnk3o4luqvjdgia', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQFj:B1Wiz-4UJegpeP4O6qlYBf7M7xdFsqSfFBmoP7stH8A', '2025-11-30 00:04:23.767753'),
('6nc1hbdrwfsa1grxvgt0ccmcvl7jejrq', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiQE:7FRAQj2Ro5u7lpvmG6wtozpmB-L52hnyA_ecYllhurI', '2025-11-30 19:28:26.567312'),
('719u3e7rd2xdv8cosklphz5771ccm7u2', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vL6nh:3Rexf0ERCcZLFJ6FRipVbnxQhgj_kwnJENkqkEP3c8U', '2025-12-01 21:30:17.704158'),
('71ayoloh65q0n41ohc0mn4ho0ylvduio', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuP4:hlqH_1gd8dLtsQprWxe7vMZWWU909hVt9-5zVmSu1uA', '2025-12-04 02:28:10.455725'),
('7bzq6cu40rf96p7qr97zx6t9b7uxh7bg', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQF8:D_VFi6jGBozAWeYyiAJSrxEpiR_tVM75rKvjf2hj4fg', '2025-11-30 00:03:46.147628'),
('86qy9c8om824r0hxts7ukdznpbl4zd09', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKlJu:iQ5rS7OUQGMh9uWGhimYg8H2Rg6rutyZwLeMibNTdoM', '2025-11-30 22:34:06.745038'),
('8kf00p2hdhbkjcjeuyf1o4cdzcpx17us', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKOnw:KP6kr9hMRbY5a85NBBj0-ql6ix4c7ORySLn9xIEn5EY', '2025-11-29 22:31:36.819625'),
('8zarqr468zcf6zajxwn6qhbo58kp7gov', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL1AD:7QeynQiAmF36I5X_bjR1YQory36bSVAsvhjD8hU14gI', '2025-12-01 15:29:09.424414'),
('91mnygtp6atm35a1sovoopd45h2o86sg', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL6oT:ztybMTQ9VvA2XqbURioSQjuNVSsqnl0Sr8eAYL03V18', '2025-12-01 21:31:05.950154'),
('9igelmjzhpsbrhmh0ldfouobtbvxfbxy', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhcP:-WMV7OCWva6lAr0XY-5IniTFDJU_KGYtAFXmD7h5fsY', '2025-11-30 18:36:57.685785'),
('9qn2g5mbqzum58oybru87fdprjyaat1k', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vL7yw:LSmWgIfq2Cp35ZVi-h0W_wi_dB0rSXCLgf9pJvYw7qY', '2025-12-01 22:45:58.947803'),
('9w14ya2d6651kt6ehfpe09af3ngrdhh1', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiYv:qXgn-BzQrFmBje_PpY_4g4dMfCPwMqNlhkl0dE3qh2k', '2025-11-30 19:37:25.615799'),
('a6nz65u2c1ggt3s9b3qtd2lf01l097xw', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL7xU:8GGUB6QcQmbe0xUf4ACO2SbFNzWkG4VigjXI76UlBfU', '2025-12-01 22:44:28.671152'),
('ae11p7bvzfcah7vkyq2haanpnk4muqi0', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhdM:o24KXLY_gk30sO22NrRO-roRQHcg9yJRzvx_j1rGNFs', '2025-11-30 18:37:56.353115'),
('ah4gm2mtgeaj884jhkmx892nvog6u2vs', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKOes:fTOTZAacHBjqcrqmxLCB8uQwgmkllEfFw2P4Mqvy_SU', '2025-11-29 22:22:14.479901'),
('aw9er48czwl73e9hgefxvbap0i24jedw', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKPB0:auSfJ28-dJ6StKBOy9inDMBcmFK6_RR3HvVt3-YzDE8', '2025-11-29 22:55:26.904926'),
('b0w70l8tae55v5i238agqjr98c7otvsj', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuLv:EdZclClTpzuwgpqJyL8skbnmwgPgjGSQcsHlDBbhLrw', '2025-12-04 02:24:55.349260'),
('bc8rjr2z6myqiqb3o2pg62stclbgum37', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhfe:hEhdU71t31EZuYqPWYXQ_-rblVSWwvAsriXjieQW_Ps', '2025-11-30 18:40:18.904343'),
('bnduglay8cah3mooi1dqqgsdpixq1oxn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhhB:EjtR0gcGdCXfaDGIoPBMiYJUsnNF7e9TMRxcQLs-Pj4', '2025-11-30 18:41:53.089003'),
('cjcqmwtds81oq8asqfct7ksrc463tp3g', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKjLH:FRbG9NmYtej0pn0hQC3SZLEa-fyRq2avTbrzxZGUUxA', '2025-11-30 20:27:23.422967'),
('csblus9tdj4y2ml1h6k9qtftp7whk35t', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQ2l:jVLkBkwyBCrTfm3JpQBKNmYdZzSXzam8h_u461LOfjw', '2025-11-29 23:50:59.397712'),
('cvi03d4nk97un3xfb6zvklwmv7e2ha6u', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKkDV:yuLY30qJW0BzNtOpSGtfq8g5OHKR4PlXdfsXzPbWXg0', '2025-11-30 21:23:25.200058'),
('cwnecx091imasgcahhhgep66fmc65swh', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL1GU:hEDWUdqNhDzVmT0qaQGJmxuekqxxdPzxpFDl9admcAk', '2025-12-01 15:35:38.539947'),
('cyq66af4jigbzotkz42imd69ylwli0wh', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vL6nw:mucR_5yS39knk3QtvcdVKUtnX5QMe375O-7UP-3jM78', '2025-12-01 21:30:32.406013'),
('dbohnvcihvt4150che75nufq1zpbqp78', 'e30:1vKP7G:izdlBkfON4fXpqwduGQG4qgb0hpWwEIxpDsrUpOX6-U', '2025-11-29 22:51:34.318982'),
('dfiwt2urxywi8rclhf898edmjrod741s', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLrsN:eT3SbvTJk5Uc9knm9_JIddHhZ71VcMi6LHNPCwyxGhc', '2025-12-03 23:46:15.053339'),
('dkxeu8fxzdje5oak45w0ad4ib943zgwl', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKjJx:av6XrFg9QiQnRhSjk14LS4E96UEUlsZxfrUKBDageyc', '2025-11-30 20:26:01.098496'),
('dtleon8xqevh7qxtu65u8gmj9q2n0cmc', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhSi:x7pDX33Eg9ojn3YvnzmWGq2WdAxRT-GA3vl8_23peXY', '2025-11-30 18:26:56.529120'),
('dxasweyogb4r6q6ga48crnd203yyhvp8', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiOm:u8yO_uruAe2M6cGmMZibY1G8-WWCtmOVozB3Ii4pD0Q', '2025-11-30 19:26:56.787334'),
('e608usober3az91qg6n9mqaxu24wtmhs', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vLuNX:Zc6tQfCWN3oYQKJleTb1vQihPP9zBM38qKsv7QRaMeM', '2025-12-04 02:26:35.619666'),
('ebwggupcq1n7naej8tzc8b4xa0hwd06u', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKPwe:DsYZVk5iff3_6WNkIW_hkyg6An4IUfv2WazE1CEj2Ug', '2025-11-29 23:44:40.913213'),
('eodwdltw9oz0if4b5emfjq7ul1uqums4', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhbZ:quoAAZR7iP1P2szy0fOoDyjivILw8oOHGiv8NuxBUJc', '2025-11-30 18:36:05.821692'),
('frxuad07pjjyi7j9h5xrv29oty8hy3vd', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQBj:QKVpr1xA08gzncK77vQnBlnIr05aLx_Vyb7-bn13aLc', '2025-11-30 00:00:15.400814'),
('fsmow56h9mniv0ifvw60qheficj25i6i', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQEC:VeX_b6s1nVegEswmBuGFo3WW1BaFr8r9hGP-nGQ2bJ8', '2025-11-30 00:02:48.307233'),
('gbvkzpjiwlhc3mrie0lxxse4omsdenu6', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQ2U:5mkR2QZj4VpybWr2JUItotEvenDnmyE_bSDfmiybW8A', '2025-11-29 23:50:42.747932'),
('gg1h1vqewkswx2bxjsux66ex68wsmuum', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vM9Uq:h573i77pAKG9yQwF15p5kwnN8xiqoAD6iUWRtM1S9Ac', '2025-12-04 18:35:08.564121'),
('gom1sj8bqc4sg8vigtss0sn0o3w9cut6', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQEm:oyvWunPt9ynMovh36Pb3ThNTCog5X6owQn2_F-yXsyo', '2025-11-30 00:03:24.627690'),
('h7wln71w2hapqwtbkkerqn5g47rdaf0d', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKP51:7u5XfBkH8nyTvb6NuK5EGH7WNk4Mki8ymcOepGaeC6I', '2025-11-29 22:49:15.743529'),
('heckg4ndh0ck4anlo7xcznb8stsw1ejn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuP3:p9X8x5Wyi0KhFohdhy3SoAh6tokMzP2p9XAiOxAxuUU', '2025-12-04 02:28:09.117337'),
('het1x4a7l3srd3lggwfq8rffjmbcr9t8', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vLuNh:gPgP56wupnZElVBMgghc_QPlSSMZzvd6US3x1Ki_99Y', '2025-12-04 02:26:45.242031'),
('hs0f0a41t96ucr8daj3akrpysza4nme1', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKjLN:-68Gze9900qA3A2SC3GH6-flfrL8wmRyHxaRK23BZus', '2025-11-30 20:27:29.588339'),
('hucmtn4811i4x3i3gqlq8c46p6jd8f0x', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKlLm:bR2271490tbNE_zvxD3WTtTv0aJ2bSDH6kZPVOhxET0', '2025-11-30 22:36:02.342498'),
('im8ulm5vu917ogxdgubtvhor9jciw3i0', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi5D:XKlojLe1oHgwyojPL0N_R5knrb5g1DiFbDjNDFZp35A', '2025-11-30 19:06:43.921970'),
('iowh3epiwvwbyorfsrou5hr5yjx81el3', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKjJy:3PRARWMZx_AMtW1jU7XeDX7OSUET0TxZ02-Nq3AmpQA', '2025-11-30 20:26:02.457888'),
('irhbsulmwanhuap85fvtzntjbr798g2l', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKPEB:OiJcjt8C7nnnzVZH_cT3TKxu166mnT3sJpdQJ2XqpFg', '2025-11-29 22:58:43.241191'),
('jbvh0cr87xzy8s1n8mj84vc8tl9br5xs', 'e30:1vKP7u:tOarZBMsva0TgWsgI_KHXOfpXipDygZ-5EIfMifI1o8', '2025-11-29 22:52:14.848871'),
('jeepy47ct11sxwckmdgrc5c1mrscpa6r', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi2Q:9xSDdyUtTmGd8UgSEIV7461XtSz0nxqYqNKzfDT-oTE', '2025-11-30 19:03:50.766582'),
('jntir8zvoyb3r0nm9zhmb7lr4e3bo2h6', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuHQ:pzO_DuruiGf0LetSbrGYhcNHlsAs9IYzYrn9K9n7D4U', '2025-12-04 02:20:16.888796'),
('k684qkyv4lvn5sw01m87pacz8534bcbc', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKlJf:6bS8D1ugiBmXkubsdO0kwM6zv4MwraLhpgpou98WtjI', '2025-11-30 22:33:51.948163'),
('kdjzmv8wbikdluwj5itq29ixjau1r1ex', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQEh:_ZUsU-Hp0qPS2LhrzmUB5IR1KykZGJ7rBZ2t023dvAk', '2025-11-30 00:03:19.517370'),
('klafaj22pvcmce6akz4so8revwhn8jrs', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkEH:eyM3OpmFWw_opGHU36kbq0WdEYI-Wve7d0iACuTP0i4', '2025-11-30 21:24:13.344668'),
('kohgxn7x93bgso8pbn2x0s34eq95ucz5', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkgx:62GTW52_ZjAmhMZ0eOiPt8LDMx4n4mVoOgmts1jjRLQ', '2025-11-30 21:53:51.344688'),
('kym0ka7be8xjmph4g17pu2im9dnsbftv', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKihn:48mmj4jCeKKwZe8W_N3cHgUVsBTNipOgvM5tpFeQCC4', '2025-11-30 19:46:35.345545'),
('ly8an5h0t9ooqoguaugnooz58qoche0v', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQFj:B1Wiz-4UJegpeP4O6qlYBf7M7xdFsqSfFBmoP7stH8A', '2025-11-30 00:04:23.583468'),
('m9wxl92zcxll9bd4h1w32cmv0ymwqcz4', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKPIT:mbKFCOAZfPndVuS3et-mHGshB057lSNxwiRyToFkckc', '2025-11-29 23:03:09.690032'),
('mgxcj6ezzllpdv1t49fm6rx1rjj1hxbg', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkCf:Q72oMMBT5Svdq8HGWRShCDlZmdN5Hz91D7TXB9OcS0k', '2025-11-30 21:22:33.414044'),
('mvun52b5ldhfbr8g26tehkjpulq9yssv', 'e30:1vKP6l:R1iB7LDL3AD2ehQXzop9SQ1uifpLa6TXtmEb2VYzaWs', '2025-11-29 22:51:03.048338'),
('n0w7n14hw6od8so2bi5p9c8yqtel5ejc', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQEF:1oV6i2vuG08neJnx9bjy6HIjS0ZMh1WvcSoYFxDQGPw', '2025-11-30 00:02:51.742031'),
('n36jfmx6xn2yxeiumfddm1qfmb9yohvw', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL14S:zI4m5-M6kn8cOjvzBWwZtdBTkllYBOCqSv1_tcx0wK0', '2025-12-01 15:23:12.615298'),
('nl6gswtyn227x8nef080gidzep542hgw', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vLuNi:S2_Neyyc0mSW6W1YhdDcNK3no72lxKEhcy-neQpMT84', '2025-12-04 02:26:46.281236'),
('ofk2uqj8mxsco0sc9bdfwkl6tar6vejn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuOw:LkLK96-2h_VuxHG_y6EOISVEGDQxwgArv0OR01I-4Gk', '2025-12-04 02:28:02.588340'),
('osdam4ios32bz6719lz6p16nsjqr7125', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vL19P:hE01eQpehr5yYLPZu0VWC7RnPx4jxjJOzr3Kz6_4d7U', '2025-12-01 15:28:19.277690'),
('p0lv7dvsnfha12sdygdq0et92js7mcqm', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiD7:a6a59XF-bu-F7iZA6c38hSwdnq7e3sjCh4_ns3QQ8zQ', '2025-11-30 19:14:53.713025'),
('pb3hapmrctbzb1vn6u10ut97itw6rglh', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKjLG:PgAv1uhhSKHC1hmePcVHuyxye7GUMui46nUY2b09a1k', '2025-11-30 20:27:22.164079'),
('q4wllwhu1evu5hlcgj6im2omwujwx7sv', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuNL:2P23Saov8oi_0aCCjUdNx_PgZD0oHkcOhn0gMjeInUA', '2025-12-04 02:26:23.662055'),
('qdzr9ouvnbh3g71trtyxze4bkfnychth', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vL7yk:7HpUhrfUWDUiSCMMLGoF_wjhf6NNdsFF8luQ90Isd_k', '2025-12-01 22:45:46.300144'),
('qtx5vrow4iviwvfn4ayoem5j05ljtgrs', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vL6nf:7NPbaNWZRMW5iNld6eSVQYnoE-feiv4estX1ZsAIv6M', '2025-12-01 21:30:15.916644'),
('r6ewvqnlluxkc0913tcm1fh58b2vbusb', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL6oV:9r4ovVkjfx2jAhLuQyEYohvrJXcfnnaJWgf2qsPoYJU', '2025-12-01 21:31:07.621821'),
('rgwsac9ptglp0vpiwg30lzb0et1u2pxn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQFM:5RDFdgqVKyzf1dZv7tAlImligUv60XRI3WbJGE-4Ezo', '2025-11-30 00:04:00.580308'),
('rhtgjpxx8f9kifcapn9soexn64730mme', 'e30:1vKP7k:-QWjhNWijBoEyiilIaLhE_CfB5hWirwoijuco0fQq_8', '2025-11-29 22:52:04.333977'),
('riro5oikfe24rg8bpv9qfzpv28gginwc', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKiTF:1RetQdD2Y2-5Jm1WXwJmGb4b0xpozp7OSFDNC1W_IFE', '2025-11-30 19:31:33.554212'),
('risxfrmfh039j83efjebmru28p5ndb3w', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQFN:n05uzXrboqu0MOuQ2lIEZr7_T6kMb4WLDF1rufkzH_E', '2025-11-30 00:04:01.499687'),
('rrt7v4a53km0o6mipc9qhzqm0u85wojs', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi2I:UO0WECU4ggd2GMZJfu8hwNuV8M6qsgLddFP85Jtp0i8', '2025-11-30 19:03:42.937891'),
('rv7f5i9mobhcd11mec2t8e9nhggrwo83', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vL7yv:GLFvJK2flvm59sMb446ciKeCGgwbStppj8xiPGLLsfo', '2025-12-01 22:45:57.594080'),
('s193j92dz0qnekqlbeb47ggohp0ja5u6', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vM9VX:lWHby6AhwTT_f29WTDqJ9axOrHWpMYyobGLrcshWDc0', '2025-12-04 18:35:51.067718'),
('s56rk02by1ppi6asjfsebesgd6imd3yx', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKkhK:PLDMHkxurSRQSGdEG7QNokPwAg_NGYeLLG7EHlJftsI', '2025-11-30 21:54:14.903750'),
('s86bhf6wrmx5gchciufpx66akhtn26wn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhd7:OxZqikeql6t9wciJs1YK1DWtfKh-9TCFaqyju1CQfmk', '2025-11-30 18:37:41.051908'),
('sjd49x11nm0iid4kgw97ri1y2ow7h8a8', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKkDT:iYQycpKF1JqTLAEnQQnATi7d34RvN61k0Ywjik7pMNQ', '2025-11-30 21:23:23.963479'),
('skrwbw3xj3pllnox5fz39blfx5tczo3z', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhhQ:06H36EIg3c5CEDeELTr9ipVg_Or8vikr5OGx1RB_Sl4', '2025-11-30 18:42:08.262490'),
('ssapbmop5d8nsz84vkz0ml79jbr01km4', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkni:DPeLxzI0zgLKfnZkGx8QsUt4DrAmKT912lbZXWMHZR8', '2025-11-30 22:00:50.573355'),
('sxiugj61esggvqkys860dr4rvx741o40', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi2M:F2d-zYRt21VGnG9GhUZaY_LFMPpAGrTgGAlVGe9cHgE', '2025-11-30 19:03:46.933889'),
('t0a22u8zgt3lyn1laf2i1f7zm9vu3tw1', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKkhX:PjjOXvzhXOdqqYBauuZfHCcyvTfNnwe1YjOa0bJzljw', '2025-11-30 21:54:27.196854'),
('thr97y7j53vqhgxl6co6lnsj92rjpi3x', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKOh0:KvHgAfycenizQ8ueNyJaFwUr3vIxhp1UOmQL7apA4cI', '2025-11-29 22:24:26.386995'),
('tpo14xww14zjqzlxowjoprtxp4j3860y', '.eJxVjLsOwjAMAP_FM4rilKZJR_Z-Q-XYDimgVOpjQvw7qtQB1rvTvWGkfSvjvuoyTgI9YAuXX5iIn1oPIw-q99nwXLdlSuZIzGlXM8yir9vZ_g0KrQV6ULLc-C5klSaptckxRUTxMeTMIWSLwWHsSJxtPWfsoqbYuBbFXykyfL4dDzg9:1vKjzy:IBbuiOcv30yueOoRjuZJ4pyFY4ksI1TKPpl0Cfop89M', '2025-11-30 21:09:26.343749'),
('tvxay5mf63lbhegfdwwywx3ijimx75yn', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKkzC:xLmBOFSmxrAtyy0gT4gifqkkaqjy33cAAUJtqcEtRzY', '2025-11-30 22:12:42.502263'),
('ukskifpwlp2q8hwoz9zh9y7s8gyiulpc', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vLuNP:O9CzZyLf51xKZ1GkqwRvSjpGxQ2X2epUFqu_h4LAz0w', '2025-12-04 02:26:27.582398'),
('v48t38s4w967lxrupku2jrdpc2dfp5uo', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vKjLO:VguPQb8ox6gNU3AheTb7p5_M8aXjcBCR3Fu5ZOByDcs', '2025-11-30 20:27:30.569196'),
('v4jzjdcypfbrj4zb0407mh4ebdi5n00b', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL1AE:w0lYgyET2cRSTGPas-vbf5bHxuCFIcL_5z0IJgBWIM0', '2025-12-01 15:29:10.973065'),
('v5uex5eu9pteio3bxl83b3qcj2enomdy', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKQBY:7N1hI7bi1S371xcoU-kDAFh6EFiJ2CjSklKtsbV2w28', '2025-11-30 00:00:04.268635'),
('vkr381sgr51f9kwqbs3btfoakn2x7w16', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi5V:LFzTQxhHIGOYnGRkC0NT5wvchf2dzVn8xBSqLW2Rg60', '2025-11-30 19:07:01.318417'),
('vrdn0u64nm6dv0y1fnlroz9qs4vgfaku', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vL6nu:vzg2nt7ekgEXiki8sgBUKycVZwczxci8Od86FWh3VUE', '2025-12-01 21:30:30.612988'),
('vz2sb04jaw59kj7r7n5dluucwlw273d8', '.eJxVjEEOwiAQAP-yZ0NYFtjSo3ff0FDYStXQpLQn499Nkx70OjOZNwxx38qwN1mHOUMPAS6_bIzpKfUQ-RHrfVFpqds6j-pI1Gmbui1ZXtez_RuU2Ar0gJ112msSTKLJdMIsicmS8X5kT5PzxnjSnDjYnJGcRQ7ROcQwGRT4fAGjDTX9:1vL7yl:qiXxBN7TkwCFFhz2odXoZcMKKgpzvYAFy81q72_TQBU', '2025-12-01 22:45:47.045097'),
('w7xlvagrrnsbwkvst4qze1280q9n29g5', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKkDF:Fctv8LKSM4YONWB5m_kQ5q2jbiFD7B6R4mseiFoClxE', '2025-11-30 21:23:09.166017'),
('w83nqayleyqpslxrpup2oeaf62cbtmod', '.eJxVjMsKwyAQAP9lz0VUdN3m2Hu_QXysNW1RiMkp9N9LIIf2OjPMDj5sa_Xb4MXPGSZwcPllMaQXt0PkZ2iPLlJv6zJHcSTitEPce-b37Wz_BjWMChNoo7kUnYxTXCgxxkIoUWFEKpmtoZBldKq4a9JKkZGYNFs22lqFmeDzBfLRN7Y:1vJ0gq:bT0-QhRKSyyWmaAMrdHAWyR9yJq3-BQL9QQj0CkH6aA', '2025-11-26 02:34:32.869172'),
('wqmca366zb21d9n37vb22j8boq1vwx5o', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKhdG:tmBW9M5YVQuD-ACcsHZivWfytfF-boy4RZB3RYw5o6s', '2025-11-30 18:37:50.863835'),
('x6ym2abuseaswjd4fmd3h5ndtldpv6me', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKPyQ:Ca7zfrwGF4t4W8yMnMnTfH0M4m8XLW9oeJp_9_i7kQY', '2025-11-29 23:46:30.441336'),
('xiqkuxkvuz9sl58lrn3xynhy5yspzbrr', '.eJxVjMsKwyAQAP9lz0VUdN3m2Hu_QXysNW1RiMkp9N9LIIf2OjPMDj5sa_Xb4MXPGSZwcPllMaQXt0PkZ2iPLlJv6zJHcSTitEPce-b37Wz_BjWMChNoo7kUnYxTXCgxxkIoUWFEKpmtoZBldKq4a9JKkZGYNFs22lqFmeDzBfLRN7Y:1vKjzO:WzyAGiaReWMfQfaBgXUbr76dEQEhOQEHN3SECT7gawI', '2025-11-30 21:08:50.347134'),
('ycbuuqw2zs9nf2jgun3ryb40jh9lzn1v', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vL6nI:FJR33S3dPvxgLB0xro69-AFwERX7L7tos5UpWdrYiYI', '2025-12-01 21:29:52.499351'),
('ygfvpec4ggli7xgx8mdj0ydt56poss33', 'e30:1vKOfv:PUINI0B_gCHfSFqVI3vVsSB7nswX0AOUMT7fZuKhvDU', '2025-11-29 22:23:19.383116'),
('ywwzliv78nweoddkiu5atl45k83yav6q', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKi2V:LE7980VnL-nzxuM_brp17JiW9NFfQrk557Xv-7HsER0', '2025-11-30 19:03:55.446096'),
('zgodfz9nv0m1d4sqs55d80bro2xb7799', '.eJxVjMsOwiAQAP9lz4ZAt7x69O43kIWlUjWQlPZk_HfTpAe9zkzmDYH2rYS95zUsDBMYuPyySOmZ6yH4QfXeRGp1W5cojkSctotb4_y6nu3foFAvMMGInpSmxJkG1NnozBZdUojaoR2cm732Mo1sBkkcpSHPyrt5ZDROWQufL9ZNNyo:1vKOgU:vfyyK83bbbgju0WuTnLq-V9Y8chVFE_tuxz2jMUvR4Y', '2025-11-29 22:23:54.141961'),
('zh7ob49q9dx3f6m341vur7obxh3o1j8r', '.eJxVjDkOwjAQAP-yNbJ8xXZS0vOGaNfeJQFkSzkqxN9RpBTQzozmDSPu2zTuKy_jXGAA4-HyCwnzk-thygPrvanc6rbMpI5EnXZVt1b4dT3bv8GE6wQDxL5jk0soJlhGh9F3RQulLJ4ksVjibKWLxGSCBJe415Y0OtHO-5jg8wUvizjJ:1vKjL5:I7v52WLDTpeCh3SR9yq0GkLk6WK1v3xuucVZ0Hml_uo', '2025-11-30 20:27:11.011310');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loginapp_customuser`
--

CREATE TABLE `loginapp_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `email` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `loginapp_customuser`
--

INSERT INTO `loginapp_customuser` (`id`, `password`, `is_superuser`, `username`, `is_staff`, `rut`, `email`, `first_name`, `last_name`, `area`, `is_active`, `date_joined`, `last_login`) VALUES
(6, 'pbkdf2_sha256$1000000$4XaBTwCVVUnh9Lwp8a3lAt$vWSgUGrJISsXqbbm0CscBGRy8hwrkczdBOEGTNp+ATY=', 1, '.1', 1, '11122', 'test2@test.cl', 'test', 'prueba', NULL, 1, '2025-11-12 02:02:07.000000', '2025-11-20 02:28:09.725794'),
(7, 'pbkdf2_sha256$1000000$XiqJgMIcaOdkG3hxKgbtsG$hcvkz9ydB5vl1gXZlfiS7M0WOkHPbUePDyU76/u8wTA=', 1, 'user', 1, '121', 'diego@gmail.cl', '', '', NULL, 1, '2025-11-12 02:11:09.992561', '2025-11-16 21:08:49.619138'),
(9, 'pbkdf2_sha256$1000000$ZfkHitKIJXkorJBlgYwwVg$Xo4ynSfiF4cvFMKylk+5c2kvs4QOsgS1UsbNT3jpR0o=', 0, 'testin.testeado', 0, '55555555', 'test3@test.cl', 'testin', 'testeado', 'ninguna', 1, '2025-11-16 19:25:13.000000', '2025-11-20 02:26:34.876659'),
(14, 'pbkdf2_sha256$1000000$Jwv0UnEhigyBs5uHlsYGSn$Xd7pdszBm+t+OIxaGWSNozupTQKDFzjC2FnHvC8UUZA=', 0, 'testin.super', 0, '11111', 'test1@test.cl', 'testin', 'super', 'asas', 1, '2025-11-16 20:26:23.000000', '2025-11-20 18:35:50.347204'),
(15, 'pbkdf2_sha256$1000000$3YLwWRNbjTUdN66uPJCX4w$Zv10tSoEgi+oWlK8zsXnk92BeVM+FCh14JQdG7VzSzw=', 1, 'diego.fuentes', 1, '18513068-1', 'diego18.df@gmail.com', 'Diego', 'Fuentes', NULL, 1, '2025-11-16 20:54:01.000000', '2025-11-16 21:09:25.609559');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loginapp_customuser_groups`
--

CREATE TABLE `loginapp_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `loginapp_customuser_groups`
--

INSERT INTO `loginapp_customuser_groups` (`id`, `customuser_id`, `group_id`) VALUES
(1, 6, 1),
(2, 9, 3),
(3, 14, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loginapp_customuser_user_permissions`
--

CREATE TABLE `loginapp_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_loginApp_customuser_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `loginapp_customuser`
--
ALTER TABLE `loginapp_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `rutID` (`rut`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `loginapp_customuser_groups`
--
ALTER TABLE `loginapp_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `loginApp_customuser_groups_customuser_id_group_id_dca33922_uniq` (`customuser_id`,`group_id`),
  ADD KEY `loginApp_customuser_groups_group_id_2564e8da_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `loginapp_customuser_user_permissions`
--
ALTER TABLE `loginapp_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `loginApp_customuser_user_customuser_id_permission_969c671c_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `loginApp_customuser__permission_id_e3060661_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `loginapp_customuser`
--
ALTER TABLE `loginapp_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `loginapp_customuser_groups`
--
ALTER TABLE `loginapp_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `loginapp_customuser_user_permissions`
--
ALTER TABLE `loginapp_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_loginApp_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `loginapp_customuser` (`id`);

--
-- Filtros para la tabla `loginapp_customuser_groups`
--
ALTER TABLE `loginapp_customuser_groups`
  ADD CONSTRAINT `loginApp_customuser__customuser_id_83b07665_fk_loginApp_` FOREIGN KEY (`customuser_id`) REFERENCES `loginapp_customuser` (`id`),
  ADD CONSTRAINT `loginApp_customuser_groups_group_id_2564e8da_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `loginapp_customuser_user_permissions`
--
ALTER TABLE `loginapp_customuser_user_permissions`
  ADD CONSTRAINT `loginApp_customuser__customuser_id_4dcce53d_fk_loginApp_` FOREIGN KEY (`customuser_id`) REFERENCES `loginapp_customuser` (`id`),
  ADD CONSTRAINT `loginApp_customuser__permission_id_e3060661_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
