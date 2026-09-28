<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

if (empty($_SESSION['user_id']) || empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Geen toegang. Alleen beheerders kunnen producten verwijderen.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = !empty($rawInput) ? json_decode($rawInput, true) : $_POST;

if (!is_array($input) || empty($input['id'])) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Product id ontbreekt.']);
    exit;
}

$productId = (int) $input['id'];
if ($productId <= 0) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Ongeldig product id.']);
    exit;
}

$stmt = $pdo->prepare('UPDATE products SET is_available = 0, stock = 0 WHERE id = :id');
$stmt->execute(['id' => $productId]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Product niet gevonden.']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Product verwijderd uit de collectie.',
    'id' => $productId,
]);
