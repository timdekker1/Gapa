<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../database.php';

$input = json_decode(file_get_contents('php://input'), true);
$email = strtolower(trim((string) ($input['email'] ?? '')));
$password = (string) ($input['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	http_response_code(422);
	echo json_encode(['success' => false, 'message' => 'Vul een geldig e-mailadres in.']);
	exit;
}

if (strlen($password) < 8) {
	http_response_code(422);
	echo json_encode(['success' => false, 'message' => 'Het wachtwoord moet minimaal 8 tekens bevatten.']);
	exit;
}

try {
	$statement = $pdo->prepare(
		'INSERT INTO users (name, email, password, password_hash) VALUES (:name, :email, :password, :password_hash)'
	);
	$passwordHash = password_hash($password, PASSWORD_DEFAULT);
	$statement->execute([
		'name' => $email,
		'email' => $email,
		'password' => $passwordHash,
		'password_hash' => $passwordHash,
	]);

	http_response_code(201);
	echo json_encode(['success' => true, 'message' => 'Je account is aangemaakt.']);
} catch (PDOException $e) {
	if ($e->getCode() === '23000') {
		http_response_code(409);
		echo json_encode(['success' => false, 'message' => 'Dit e-mailadres heeft al een account.']);
		exit;
	}

	http_response_code(500);
	echo json_encode(['success' => false, 'message' => 'Account aanmaken is niet gelukt.']);
}
