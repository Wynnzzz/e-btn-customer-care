<?php
// process_queue.php

// Enable CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit();
}

// Database configuration
$host = 'localhost';
$dbname = 'e-btn-customer-care';
$username = 'root';
$password = '23082004';

try {
    // Create database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get today's last queue number
    $stmt = $pdo->query("SELECT queue_number FROM tickets 
                        WHERE DATE(created_at) = CURDATE() 
                        ORDER BY id DESC LIMIT 1");
    $lastQueue = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Generate new queue number
    if ($lastQueue) {
        $lastNumber = intval(substr($lastQueue['queue_number'], 1));
        $newNumber = $lastNumber + 1;
    } else {
        $newNumber = 1;
    }
    
    // Format queue number
    $queueNumber = 'A' . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    
    // Insert new ticket
    $stmt = $pdo->prepare("INSERT INTO tickets (queue_number, name, email, complaint, created_at, status) 
                          VALUES (?, ?, ?, ?, NOW(), 'pending')");
    
    $stmt->execute([
        $queueNumber,
        $data['name'],
        $data['email'],
        $data['message']
    ]);
    
    // Send success response
    echo json_encode([
        'success' => true,
        'queueNumber' => $queueNumber
    ]);

} catch(PDOException $e) {
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>