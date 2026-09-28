<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

if (empty($_SESSION['user_id']) || empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Alleen beheerders kunnen vragen beantwoorden.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$questionId = (int) ($input['id'] ?? 0);
$answer = trim((string) ($input['answer'] ?? ''));

if ($questionId <= 0 || $answer === '' || strlen($answer) > 4000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Vul een antwoord in van maximaal 4000 tekens.']);
    exit;
}

$exists = $pdo->prepare('SELECT id FROM product_questions WHERE id = :id');
$exists->execute(['id' => $questionId]);
if (!$exists->fetch()) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Vraag niet gevonden.']);
    exit;
}

$stmt = $pdo->prepare('UPDATE product_questions SET answer = :answer, answered_at = CURRENT_TIMESTAMP WHERE id = :id');
$stmt->execute(['answer' => $answer, 'id' => $questionId]);
echo json_encode(['success' => true, 'message' => 'Antwoord opgeslagen.']);
