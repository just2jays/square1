<?php
$host = "localhost";

// Dev connection vars
$dev_dbname = "wie";
$dev_user = "root";
$dev_pass = "root";

// Production connection vars
$dbname = "square1";
$user = "root";
$pass = "masterj1";

// Dev PDO Connection to MySQL
//$db = new PDO('mysql:host='.$host.';dbname='.$dev_dbname, $dev_user, $dev_pass);

// Production PDO Connection to MySQL
$db = new PDO('mysql:host='.$host.';dbname='.$dbname, $user, $pass);
?>
