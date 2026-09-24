<?php
header('Content-Type: application/json; charset=utf-8');
session_start();

if (!isset($_SESSION['user_id'], $_SESSION['user_email'])) {
    echo json_encode(['authenticated' => false]);
    exit;
}

echo json_encode([
    'authenticated' => true,
    'is_admin'      => (bool) ($_SESSION['is_admin'] ?? false),
    'user'          => [
        'id'    => $_SESSION['user_id'],
        'email' => $_SESSION['user_email'],
    ],
]);
