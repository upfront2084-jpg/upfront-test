<?php
// Single REST endpoint replacing the app's Firebase Firestore sync.
// Actions (via ?action=...): pull_all, get_one, upsert, insert_if_absent.
// See DEPLOY.md for how to set this up on Hostinger.

require __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

function check_api_key() {
    $expected = get_api_key();
    if (strpos($expected, 'REPLACE_WITH') === 0) {
        fail_json(500, 'config.php still has a placeholder api_key. Edit it first.');
    }
    $given = $_SERVER['HTTP_X_API_KEY'] ?? ($_GET['key'] ?? '');
    if (!hash_equals($expected, (string) $given)) {
        fail_json(401, 'invalid api key');
    }
}

function read_json_body() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        fail_json(400, 'invalid JSON body');
    }
    return $data;
}

try {
    check_api_key();
    $pdo = get_db();
    $action = $_GET['action'] ?? '';

    if ($action === 'pull_all') {
        $stmt = $pdo->query('SELECT doc_id, v, ts FROM portal');
        $docs = [];
        foreach ($stmt as $row) {
            $docs[$row['doc_id']] = ['v' => $row['v'], 'ts' => (int) $row['ts']];
        }
        echo json_encode(['ok' => true, 'docs' => $docs]);
        exit;
    }

    if ($action === 'get_one') {
        $docId = $_GET['doc_id'] ?? '';
        if ($docId === '') {
            fail_json(400, 'missing doc_id');
        }
        $stmt = $pdo->prepare('SELECT v, ts FROM portal WHERE doc_id = ?');
        $stmt->execute([$docId]);
        $row = $stmt->fetch();
        if (!$row) {
            echo json_encode(['ok' => true, 'doc' => null]);
        } else {
            echo json_encode(['ok' => true, 'doc' => ['v' => $row['v'], 'ts' => (int) $row['ts']]]);
        }
        exit;
    }

    if ($action === 'upsert') {
        $body = read_json_body();
        $docId = (string) ($body['doc_id'] ?? '');
        $v = (string) ($body['v'] ?? '');
        $ts = (int) ($body['ts'] ?? 0);
        if ($docId === '') {
            fail_json(400, 'missing doc_id');
        }
        $stmt = $pdo->prepare(
            'INSERT INTO portal (doc_id, v, ts) VALUES (?, ?, ?) ' .
            'ON DUPLICATE KEY UPDATE v = VALUES(v), ts = VALUES(ts)'
        );
        $stmt->execute([$docId, $v, $ts]);
        echo json_encode(['ok' => true]);
        exit;
    }

    if ($action === 'insert_if_absent') {
        $body = read_json_body();
        $docId = (string) ($body['doc_id'] ?? '');
        $v = (string) ($body['v'] ?? '');
        $ts = (int) ($body['ts'] ?? 0);
        if ($docId === '') {
            fail_json(400, 'missing doc_id');
        }
        $stmt = $pdo->prepare('INSERT IGNORE INTO portal (doc_id, v, ts) VALUES (?, ?, ?)');
        $stmt->execute([$docId, $v, $ts]);
        echo json_encode(['ok' => true, 'inserted' => $stmt->rowCount() > 0]);
        exit;
    }

    fail_json(400, 'unknown action');
} catch (Throwable $e) {
    fail_json(500, 'unexpected server error: ' . $e->getMessage());
}
