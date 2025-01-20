<?php
// process_queue.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$db_host = 'localhost:3307';
$db_user = 'root';
$db_pass = '23082004';
$db_name = 'e-btn-customer-care';

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

// Set charset
$conn->set_charset("utf8mb4");

// Function to get the next queue number
function getNextQueueNumber($conn, $type) {
    $table = ($type === 'cs') ? 'cs_service_queue' : 'icare_room_queue';
    $prefix = ($type === 'cs') ? 'A' : 'B';
    
    $sql = "SELECT queue_number_cs FROM $table 
            WHERE DATE(created_at_cs) = CURDATE() 
            ORDER BY id DESC LIMIT 1";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastNumber = intval(substr($row['queue_number'], 1));
        $nextNumber = $lastNumber + 1;
    } else {
        $nextNumber = 1;
    }
    
    return $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $complaint = $conn->real_escape_string($_POST['message']);
    $type = $conn->real_escape_string($_POST['type']); // 'cs' or 'icare'
    
    // Determine which table to use
    $table = ($type === 'cs') ? 'cs_service_queue' : 'icare_room_queue';
    
    // Generate queue number
    $queueNumber = getNextQueueNumber($conn, $type);
    
    // Insert into database
    $sql = "INSERT INTO $table (queue_number, name, email, complaint) 
            VALUES (?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $queueNumber, $name, $email, $complaint);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'queueNumber' => $queueNumber
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error'
        ]);
    }
    
    $stmt->close();
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request method'
    ]);
}

$conn->close();
?>