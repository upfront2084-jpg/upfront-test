<?php
// PDO connection helper. Any connection failure (wrong credentials, DB not
// created yet, etc.) is turned into a visible JSON error instead of a blank
// page or a raw PHP warning dump, so a non-technical user can tell what's
// wrong just by looking at the response.

function fail_json($status, $message) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function get_db() {
    $configPath = __DIR__ . '/config.php';
    if (!file_exists($configPath)) {
        fail_json(500, 'config.php is missing. Upload it next to portal.php.');
    }
    $cfg = require $configPath;

    if (strpos($cfg['db_name'], 'REPLACE_WITH') === 0) {
        fail_json(500, 'config.php still has placeholder values. Edit db_host/db_name/db_user/db_pass/api_key first.');
    }

    $dsn = 'mysql:host=' . $cfg['db_host'] . ';dbname=' . $cfg['db_name'] . ';charset=utf8mb4';
    try {
        $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        fail_json(500, 'Could not connect to the database. Check db_host/db_name/db_user/db_pass in config.php. (' . $e->getMessage() . ')');
    }
}

function get_api_key() {
    $configPath = __DIR__ . '/config.php';
    $cfg = require $configPath;
    return $cfg['api_key'];
}
