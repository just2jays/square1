<?php
$host = "localhost";

// Dev connection vars
$dev_dbname = "wie";
$dev_user = "root";
$dev_pass = "root";

// Production connection vars
$dbname = "johnf76c_square1";
$user = "johnf76c_super";
$pass = "brash wookie coffee burp";

// Dev PDO Connection to MySQL
//$db = new PDO('mysql:host='.$host.';dbname='.$dev_dbname, $dev_user, $dev_pass);

// Production PDO Connection to MySQL
$db = new PDO('mysql:host='.$host.';dbname='.$dbname, $user, $pass);
?>
