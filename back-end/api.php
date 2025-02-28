<?php
$db = new SQLite3('moods.db');

// CREATE a TABLE if it doesn't exist
$db->exec('CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY AUTOINCREMENT, mood TEXT, timestamp INTEGER)');

// Enable CORS
header("Access-Control-Allow-Origin: *"); // replace * with URL if deploying
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Before I send the Data would the Server Allow my Request? Handle OPTIOPNS request
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    https_response_code(204);
    exit;
}

// Tell browser the server respons will be in JSON format
header("Content-Type: application/json");

// POST method, adding row into moods table
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Check if request is JSON or Form Data
    $data = json_decode(file_get_contents("php://input"), true);

    if(!$data){
        $mood = $_POST['mood'] ?? null; // For traditional form submission (Basic Front-end)
    } else {
        $mood = $data['mood'] ?? null; // for JSON request (front-end REACT)
    }

    if(!$mood){
        echo json_encode(['success' => false, 'error' => 'Mood is required']);
        exit;
    }

    $timestamp = time();
    // prepare the statement; prevent sequel statement with :parameters 
    $stmt = $db->prepare('INSERT INTO moods (mood, timestamp) VALUES (:mood, :timestamp)');
    $stmt->bindValue(':mood', $mood, SQLITE3_TEXT);
    $stmt->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
    $stmt->execute();

    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
        exit;
    }

    echo json_encode(['success' => true]);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $results = $db->query('SELECT * FROM moods ORDER BY timestamp DESC');
    $moods = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)){
        $moods[] = $row;
    }
    echo json_encode($moods ?: []);
}

$db->close();

?>