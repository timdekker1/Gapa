<?php

$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: 'gapa_database';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            last_login_at TIMESTAMP NULL DEFAULT NULL,
            is_logged_in TINYINT(1) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $lastLoginColumn = $pdo->query("SHOW COLUMNS FROM users LIKE 'last_login_at'")->fetch();
    if (!$lastLoginColumn) {
        $pdo->exec('ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP NULL DEFAULT NULL');
    }

    $loggedInColumn = $pdo->query("SHOW COLUMNS FROM users LIKE 'is_logged_in'")->fetch();
    if (!$loggedInColumn) {
        $pdo->exec('ALTER TABLE users ADD COLUMN is_logged_in TINYINT(1) NOT NULL DEFAULT 0');
    }

} catch (PDOException $e) {
    http_response_code(500);
    die("Databaseverbinding mislukt.");
}
