<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

/* Alleen admins mogen voorraad aanpassen */
if (empty($_SESSION['user_id']) || empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Geen toegang. Alleen beheerders mogen de voorraad aanpassen.']);
    exit;
}

$input      = json_decode(file_get_contents('php://input'), true);
$product_id = (int) ($input['id']    ?? 0);
$stock      = (int) ($input['stock'] ?? -1);

if ($product_id <= 0 || $stock < 0) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Ongeldige invoer.']);
    exit;
}

$stmt = $pdo->prepare('UPDATE products SET stock = :stock WHERE id = :id');
$stmt->execute(['stock' => $stock, 'id' => $product_id]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Product niet gevonden.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Voorraad bijgewerkt.', 'id' => $product_id, 'stock' => $stock]);
