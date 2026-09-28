<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

if (empty($_SESSION['user_id']) || empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Geen toegang. Alleen beheerders kunnen producten toevoegen.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = !empty($rawInput) ? json_decode($rawInput, true) : $_POST;

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ongeldige invoer.']);
    exit;
}

$name        = trim((string) ($input['name'] ?? ''));
$category    = trim((string) ($input['category'] ?? ''));
$color       = trim((string) ($input['color'] ?? ''));
$details     = trim((string) ($input['details'] ?? ''));
$imagePath   = trim((string) ($input['image_path'] ?? ''));
$stock       = max(0, (int) ($input['stock'] ?? 0));
$priceInput  = $input['price'] ?? null;
$price       = $priceInput === null || $priceInput === '' ? null : trim((string) $priceInput);

if ($name === '' || $category === '' || $color === '' || $details === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Vul alle verplichte velden in.']);
    exit;
}

if ($price !== null && (!is_numeric($price) || (float) $price < 0 || (float) $price > 99999999.99)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Vul een geldige prijs in.']);
    exit;
}

if ($imagePath === '') {
    $imagePath = 'placeholder-product.jpg';
}

$stmt = $pdo->prepare('
    INSERT INTO products (image_path, name, category, color, details, price, stock, is_available)
    VALUES (:image_path, :name, :category, :color, :details, :price, :stock, 1)
');

$stmt->execute([
    'image_path' => $imagePath,
    'name' => $name,
    'category' => $category,
    'color' => $color,
    'details' => $details,
    'price' => $price,
    'stock' => $stock,
]);

$productId = (int) $pdo->lastInsertId();

echo json_encode([
    'success' => true,
    'message' => 'Product toegevoegd.',
    'id' => $productId,
]);
