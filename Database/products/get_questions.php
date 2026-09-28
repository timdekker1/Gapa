<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../database.php';
session_start();

$productId = (int) ($_GET['product_id'] ?? 0);
$isAdmin = !empty($_SESSION['user_id']) && !empty($_SESSION['is_admin']);

if ($productId > 0) {
    $stmt = $pdo->prepare('
        SELECT id, question, answer, answered_at
        FROM product_questions
        WHERE product_id = :product_id AND answer IS NOT NULL AND answer <> \'\'
        ORDER BY answered_at DESC, id DESC
    ');
    $stmt->execute(['product_id' => $productId]);
    echo json_encode(['success' => true, 'questions' => $stmt->fetchAll()]);
    exit;
}

if (!$isAdmin) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Alleen beheerders kunnen binnengekomen vragen bekijken.']);
    exit;
}

$stmt = $pdo->query('
    SELECT q.id, q.product_id, p.name AS product_name, q.customer_name,
           q.customer_email, q.question, q.answer, q.created_at, q.answered_at
    FROM product_questions q
    INNER JOIN products p ON p.id = q.product_id
    ORDER BY (q.answer IS NOT NULL), q.created_at DESC
');
echo json_encode(['success' => true, 'questions' => $stmt->fetchAll()]);
