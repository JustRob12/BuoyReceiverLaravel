<?php
header('Content-Type: application/json');
require_once '../config/database.php';

try {
    $query = "SELECT date, time, longitude, latitude, ph, temperature, tds 
              FROM buoy_data 
              ORDER BY date DESC, time DESC 
              LIMIT 1000";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?> 