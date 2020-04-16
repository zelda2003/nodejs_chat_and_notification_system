<?php

$servername = '192.168.1.3';
$database = 'livesmart';
$username = 'root';
$password = '';

// Create connection

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection

if (!$conn) {
      die('');
}
