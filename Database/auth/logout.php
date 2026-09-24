<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

if (isset($_SESSION['user_id'])) {
    $pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id')
        ->execute(['id' => $_SESSION['user_id']]);
}

$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}
session_destroy();

echo json_encode(['success' => true, 'message' => 'Je bent uitgelogd.']);
