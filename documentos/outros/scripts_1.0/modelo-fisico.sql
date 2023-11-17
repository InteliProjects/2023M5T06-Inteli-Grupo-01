-- ompdb.omp_competence definition

CREATE TABLE `omp_competence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_course definition

CREATE TABLE `omp_course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `observation` text,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_file definition

CREATE TABLE `omp_file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `bucket` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `type` varchar(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `omp_file_UN_link` (`link`),
  UNIQUE KEY `omp_file_UN_path` (`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_teacher definition

CREATE TABLE `omp_teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `observation` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `omp_teacher_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_user definition

CREATE TABLE `omp_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(225) NOT NULL,
  `password_salt` varchar(225) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `omp_user_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_company definition

CREATE TABLE `omp_company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(225) NOT NULL,
  `password_salt` varchar(225) NOT NULL,
  `avatar_file_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `omp_company_UN` (`email`),
  KEY `omp_company_FK` (`avatar_file_id`),
  CONSTRAINT `omp_company_FK` FOREIGN KEY (`avatar_file_id`) REFERENCES `omp_file` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_module definition

CREATE TABLE `omp_module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) DEFAULT NULL,
  `description` text,
  `order` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `omp_module_FK` (`course_id`),
  CONSTRAINT `omp_module_FK` FOREIGN KEY (`course_id`) REFERENCES `omp_course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_module_competence definition

CREATE TABLE `omp_module_competence` (
  `module_id` int NOT NULL,
  `competence_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `NewTable_UN` (`module_id`,`competence_id`),
  KEY `omp_module_competence_FK` (`competence_id`),
  CONSTRAINT `omp_module_competence_FK` FOREIGN KEY (`competence_id`) REFERENCES `omp_competence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `omp_module_competence_FK_1` FOREIGN KEY (`module_id`) REFERENCES `omp_module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_class definition

CREATE TABLE `omp_class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `status` varchar(50) NOT NULL,
  `student_quantity` int DEFAULT '0',
  `current_module_id` int DEFAULT NULL,
  `course_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `omp_class_FK` (`course_id`),
  KEY `omp_class_FK_1` (`current_module_id`),
  CONSTRAINT `omp_class_FK` FOREIGN KEY (`course_id`) REFERENCES `omp_course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_class_FK_1` FOREIGN KEY (`current_module_id`) REFERENCES `omp_module` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_initiative definition

CREATE TABLE `omp_initiative` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(30) NOT NULL,
  `description` text,
  `observation` text,
  `company_id` int NOT NULL,
  `module_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `omp_initiative_FK` (`company_id`),
  KEY `omp_initiative_FK_1` (`module_id`),
  CONSTRAINT `omp_initiative_FK` FOREIGN KEY (`company_id`) REFERENCES `omp_company` (`id`),
  CONSTRAINT `omp_initiative_FK_1` FOREIGN KEY (`module_id`) REFERENCES `omp_module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_initiative_competence definition

CREATE TABLE `omp_initiative_competence` (
  `initiative_id` int NOT NULL,
  `competence_id` int NOT NULL,
  `value` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `omp_initiative_competence_UN` (`initiative_id`,`competence_id`),
  KEY `omp_initiative_competence_FK_1` (`competence_id`),
  CONSTRAINT `omp_initiative_competence_FK` FOREIGN KEY (`initiative_id`) REFERENCES `omp_initiative` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `omp_initiative_competence_FK_1` FOREIGN KEY (`competence_id`) REFERENCES `omp_competence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_project definition

CREATE TABLE `omp_project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `description` text,
  `observation` text,
  `status` varchar(100) NOT NULL,
  `module_id` int NOT NULL,
  `company_id` int NOT NULL,
  `tapi_file_id` int DEFAULT NULL,
  `agreement_file_id` int DEFAULT NULL,
  `class_id` int NOT NULL,
  `initiative_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `omp_project_FK` (`company_id`),
  KEY `omp_project_FK_1` (`tapi_file_id`),
  KEY `omp_project_FK_2` (`agreement_file_id`),
  KEY `omp_project_FK_3` (`class_id`),
  KEY `omp_project_FK_4` (`module_id`),
  KEY `omp_project_FK_5` (`initiative_id`),
  CONSTRAINT `omp_project_FK` FOREIGN KEY (`company_id`) REFERENCES `omp_company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_project_FK_1` FOREIGN KEY (`tapi_file_id`) REFERENCES `omp_file` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_project_FK_2` FOREIGN KEY (`agreement_file_id`) REFERENCES `omp_file` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_project_FK_3` FOREIGN KEY (`class_id`) REFERENCES `omp_class` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_project_FK_4` FOREIGN KEY (`module_id`) REFERENCES `omp_module` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `omp_project_FK_5` FOREIGN KEY (`initiative_id`) REFERENCES `omp_initiative` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_project_competence definition

CREATE TABLE `omp_project_competence` (
  `project_id` int NOT NULL,
  `competence_id` int NOT NULL,
  `value` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `omp_project_competence_UN` (`project_id`,`competence_id`),
  KEY `omp_project_competence_FK_1` (`competence_id`),
  CONSTRAINT `omp_project_competence_FK` FOREIGN KEY (`project_id`) REFERENCES `omp_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `omp_project_competence_FK_1` FOREIGN KEY (`competence_id`) REFERENCES `omp_competence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_project_teacher definition

CREATE TABLE `omp_project_teacher` (
  `project_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  KEY `omp_project_teacher_FK` (`project_id`),
  KEY `omp_project_teacher_FK_1` (`teacher_id`),
  CONSTRAINT `omp_project_teacher_FK` FOREIGN KEY (`project_id`) REFERENCES `omp_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `omp_project_teacher_FK_1` FOREIGN KEY (`teacher_id`) REFERENCES `omp_teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ompdb.omp_prototype definition

CREATE TABLE `omp_prototype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `observation` text,
  `project_id` int NOT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `deploy_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `omp_prototype_FK` (`project_id`),
  CONSTRAINT `omp_prototype_FK` FOREIGN KEY (`project_id`) REFERENCES `omp_project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

