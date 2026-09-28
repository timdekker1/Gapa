<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';

$stmt = $pdo->query('SELECT id, image_path, name, category, color, details, price, stock, is_available FROM products WHERE is_available = 1 ORDER BY id');
echo json_encode(['success' => true, 'products' => $stmt->fetchAll()]);
