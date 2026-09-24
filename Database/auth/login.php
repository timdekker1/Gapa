<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

$input    = json_decode(file_get_contents('php://input'), true);
$email    = strtolower(trim((string) ($input['email']    ?? '')));
$password = (string) ($input['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Het e-mailadres of wachtwoord is niet correct.']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, email, password_hash, is_admin FROM users WHERE email = :email LIMIT 1');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Het e-mailadres of wachtwoord is niet correct.']);
    exit;
}

session_regenerate_id(true);
$_SESSION['user_id']    = $user['id'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['is_admin']   = (bool) $user['is_admin'];

$pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id')
    ->execute(['id' => $user['id']]);

echo json_encode([
    'success'  => true,
    'message'  => 'Je bent ingelogd.',
    'is_admin' => (bool) $user['is_admin'],
    'user'     => ['id' => $user['id'], 'email' => $user['email']],
]);
