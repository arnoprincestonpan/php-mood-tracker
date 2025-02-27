<?php
$db = new SQLite3('moods.db');

// CREATE a TABLE if it doesn't exist
$db->exec('CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY AUTOINCREMENT, mood TEXT, timestamp INTEGER)');

// Tell browser the server respons will be in JSON format
header("Content-type: application/json");

// POST method, adding row into moods table
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $mood = $_POST['mood'];
    $timestamp = time();
    // prepare the statement; prevent sequel statement with :parameters 
    $stmt = $db->prepare('INSERT INTO moods (mood, timestamp) VALUES (:mood, :timestamp)');
    $stmt->bindValue(':mood', $mood, SQLITE3_TEXT);
    $stmt->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
    $stmt->execute();
    echo json_encode(['success' => true]);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $results = $db->query('SELECT * FROM moods ORDER BY timestamp DESC');
    $moods = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)){
        $moods[] = $row;
    }
    echo json_encode($moods);
}

$db->close();

?>