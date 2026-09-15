<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../database.php';

session_start();

$input = json_decode(file_get_contents('php://input'), true);
$email = strtolower(trim((string) ($input['email'] ?? '')));
$password = (string) ($input['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
	http_response_code(401);
	echo json_encode(['success' => false, 'message' => 'Het e-mailadres of wachtwoord is niet correct.']);
	exit;
}

$statement = $pdo->prepare('SELECT id, email, password_hash FROM users WHERE email = :email LIMIT 1');
$statement->execute(['email' => $email]);
$user = $statement->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
	http_response_code(401);
	echo json_encode(['success' => false, 'message' => 'Het e-mailadres of wachtwoord is niet correct.']);
	exit;
}

session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_email'] = $user['email'];

echo json_encode([
	'success' => true,
	'message' => 'Je bent ingelogd.',
	'user' => ['id' => $user['id'], 'email' => $user['email']],
]);
