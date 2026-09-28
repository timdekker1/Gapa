<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';

$input = json_decode(file_get_contents('php://input'), true);
$productId = (int) ($input['product_id'] ?? 0);
$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$question = trim((string) ($input['question'] ?? ''));

if ($productId <= 0 || $name === '' || strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255 || strlen($question) < 5 || strlen($question) > 4000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Controleer je naam, e-mailadres en vraag.']);
    exit;
}

$product = $pdo->prepare('SELECT id FROM products WHERE id = :id AND is_available = 1');
$product->execute(['id' => $productId]);
if (!$product->fetch()) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Dit product is niet meer beschikbaar.']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO product_questions (product_id, customer_name, customer_email, question) VALUES (:product_id, :name, :email, :question)');
$stmt->execute([
    'product_id' => $productId,
    'name' => $name,
    'email' => $email,
    'question' => $question,
]);

http_response_code(201);
echo json_encode(['success' => true, 'message' => 'Je vraag is ontvangen. Een antwoord verschijnt hier bij het product.']);
