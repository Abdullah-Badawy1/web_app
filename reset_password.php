<?php
include 'db.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];

    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Generate a new random password
        $new_password = bin2hex(random_bytes(4)); // 8-character random password
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
        $stmt->bind_param("ss", $hashed_password, $username);

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = "Password reset successful! New password: $new_password";
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Password reset failed!';
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
