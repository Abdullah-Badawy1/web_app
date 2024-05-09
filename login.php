<?php
header('Content-Type: application/json');
session_start();
include 'db.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            $response['status'] = 'success';
            $response['message'] = 'Login successful!';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid credentials!';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User not found!';
    }

    $stmt->close();
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request!';
}

echo json_encode($response);
$conn->close();
?>
