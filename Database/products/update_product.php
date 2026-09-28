<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

if (empty($_SESSION['user_id']) || empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Alleen beheerders kunnen productgegevens wijzigen.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$productId = (int) ($input['id'] ?? 0);
$details = trim((string) ($input['details'] ?? ''));
$priceInput = $input['price'] ?? null;
$price = $priceInput === null || $priceInput === '' ? null : trim((string) $priceInput);

if ($productId <= 0 || $details === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Vul een geldige productomschrijving in.']);
    exit;
}

if ($price !== null && (!is_numeric($price) || (float) $price < 0 || (float) $price > 99999999.99)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Vul een geldige prijs in.']);
    exit;
}

$exists = $pdo->prepare('SELECT id FROM products WHERE id = :id AND is_available = 1');
$exists->execute(['id' => $productId]);
if (!$exists->fetch()) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Product niet gevonden.']);
    exit;
}

$stmt = $pdo->prepare('UPDATE products SET details = :details, price = :price WHERE id = :id');
$stmt->execute(['details' => $details, 'price' => $price, 'id' => $productId]);
echo json_encode(['success' => true, 'message' => 'Productgegevens bijgewerkt.']);
