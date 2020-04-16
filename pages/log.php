
<?php

   if($_POST['logs']){
      $hotel = $_POST['hotel'];
      $room = $_POST['room'];
      $logs = $_POST['logs'];
$servername = "192.168.1.3";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO wp_livesmart_log (id, hotel_id, room_id, log) VALUES ( NULL,'$hotel', '$room', '$logs')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

   $conn->close(); }
?>