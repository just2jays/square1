<?php
date_default_timezone_set('America/New_York');
require_once("../config.php");

$method = $_SERVER['REQUEST_METHOD'];
$request = explode( '/', trim($_GET['request'], '/') );

$rest = new Rest($db, $request, $method);
$rest->process();

class Rest {
    public $db;
    public $request;
    public $method;
	public $response = array();
	public $requestTime;

	function __construct($db, $request, $method) {
        $this->db = $db;
        $this->request = $request;
        $this->method = $method;
		$this->time = substr(date('Y-m-d H:i:s'),0,15).'0:00';
		$this->requestTime = date('Y-m-d H:i:s');
	}

	public function send() {
		header('Content-type: application/json');
		echo $this->response;
		exit();
	}

    public function error($message) {
        error_log("You done messed up...");
        $this->response['error'] = $message;
        $this->send();
    }

	public function process() {
		if (!isset($this->request[0])) {
			$this->error('Required query not provided');
		}

		$this->starttime = microtime(true);
        $type = $this->request[0];

		switch ($type) {
			case 'Items':
				switch ($this->method) {
					case 'GET':
						$this->getItem($this->request[1]);
						break;

					default:
						$this->error('Unsupported request method');
						break;
				}

				break;

            case 'Checkins':
                switch ($this->method) {
                    case 'GET':
                        if( array_key_exists(1, $this->request) ) {
                            // Single Model Fetch
                        }else{
                            // Collection Fetch
                            $this->getCheckinCollection();
                            break;
                        }
                    case 'POST':
                        $data = json_decode(file_get_contents('php://input'));
                        $this->createCheckin($data);
                        break;

                    default:
                        $this->error('Unsupported request method');
                        break;
                }

                break;
            case 'Users':
                switch ($this->request[1]) {
                    case 'login':;
                        $this->loginUser($_POST);
                        break;

                    case 'register':
                        $data = json_decode(file_get_contents('php://input'));
                        $this->registerUser($data);
                        break;

                    case 'checkLoginState':
                        $this->checkLoginState();
                        break;

                    case 'fetchInventory':
                        $this->fetchInventory($this->request[2]);
                        break;

                    case 'fetchUserMoney':
                        $this->fetchMoney($this->request[2], true);
                        break;

                    default:
                        $this->error('Unsupported request method');
                        break;
                }

                break;
            case 'Utilities':
                switch ($this->request[1]) {
                    case 'checkPrize':
                        $this->checkPrize($this->request[2]);
                        break;

                    case 'forcePrize':
                        $this->checkPrize($this->request[2], true, true);
                        break;

                    default:
                        $this->error('Unsupported request method');
                        break;
                }

                break;

			default:
				$this->error('Unknown content type');
				break;
		}
	}

/*--------------------------
 * USER
 *-------------------------*/
    public function getUser($user_id) {
        foreach ($this->db->query("SELECT * FROM user WHERE id = $user_id LIMIT 1") as $row) {
            $response = array(
                'ID' => $row['id'],
                'username' => $row['username'],
                'password' => $row['password']
            );
        }

        $this->response = json_encode($response);
        $this->send();
    }

    public function loginUser($data){
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username = \"".$data['username']."\" LIMIT 1");
        $result = $stmt->execute();
        if($result) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            //if( $this->encrypt_decrypt('encrypt',$data['password']) == $user['password']){
            if( $data['password'] == $user['password']){
                $response['loggedin'] = true;
                $response['id'] = $user['id'];
                $response['username'] = $user['username'];
                $response['money'] = $user['money'];
                $response['usersession'] = $user['password'];
                $response['message'] = "Success! Logging in...";
            }else{
                $response['message'] = "Incorrect Password";
                $response['loggedin'] = false;
            }
        }else{
            $response['message'] = "User Not Found";
            $response['loggedin'] = false;
        }

        $this->response = json_encode($response);
        $this->send();
    }

    public function fetchInventory($userid) {
        $itemArray = array();
        foreach ($this->db->query("SELECT i.item_name, i.item_image_location, ui.unique_id, ui.timestamp FROM user_item ui INNER JOIN item i ON ui.item_id = i.id WHERE ui.user_id = $userid ORDER BY ui.timestamp DESC LIMIT 20;") as $index => $row) {
            $itemArray[] = $row;
            $itemArray[$index]['timestamp'] = date('D, M j, \'y @ g:i a', strtotime($row['timestamp']));
        }
        $response['items'] = $itemArray;
        if (count($itemArray > 0)) {
            $response['message'] = "Take a gander at all your treasure:";
        }else{
            $response['message'] = "Sorry, you have no items yet!";
        }

        // Grab users total cash money for display
        $response['money'] = $this->fetchMoney($userid);

        $this->response = json_encode($response);
        $this->send();
    }

    public function fetchMoney($userid, $direct_response = false) {
        $stmt = $this->db->prepare("SELECT money FROM user WHERE id = $userid;");
        $result = $stmt->execute();
        if($result) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $userMoney = $row['money'];
        }else{
            $userMoney = "You're broke!";
        }

        if($direct_response) {
            $this->response = json_encode(array("money" => $userMoney));
            $this->send();
        }else{
            return $userMoney;
        }

    }

/*--------------------------
 * ITEM
 *-------------------------*/
    public function getItem($item_id) {
        foreach ($this->db->query("SELECT * FROM item WHERE id = $item_id LIMIT 1") as $row) {
            $response = array(
                'ID' => $row['id'],
                'name' => $row['item_name'],
                'image' => $row['item_image_location']
            );
        }

        $this->response = json_encode($response);
        $this->send();
    }

/*--------------------------
 * CHECKIN
 *-------------------------*/
    public function createCheckin($data) {
        // Check if existing place
        $place = $this->placeExists($data);
        if( !empty($place) ) {
            // EXISTING Place
            $place_id = $place['ID'];
        }else{
            $place_id = $this->addPlace($data);
        }

        $query = $this->db->prepare("INSERT INTO checkin (checkin_user_id, checkin_place_id, checkin_latitude, checkin_longitude, checkin_review, checkin_photo_uuid) VALUES (:user, :place, :latitude, :longitude, :review, :uuid)");
        $query->bindParam(':user', $data->user_id);
        $query->bindParam(':place', $place_id);
        $query->bindParam(':latitude', $data->latitude);
        $query->bindParam(':longitude', $data->longitude);
        $query->bindParam(':review', $data->review);

        // Check if user submitted photo with checkin
        $photo_uuid = NULL;
        if( $data->includedPhoto ) {
            $photo_uuid = $data->includedPhotoUUID;
        }
        $query->bindParam(':uuid', $photo_uuid);
        $query->execute();

        $response = $this->checkPrize($data->user_id);
        $this->response = json_encode($response);
        $this->send();
    }

    public function getCheckinCollection() {
        $userid = $_COOKIE['userid'];
        foreach ($this->db->query("SELECT checkin.id as 'checkin_id', checkin.checkin_latitude, checkin.checkin_longitude, checkin.checkin_review, checkin.checkin_timestamp, checkin.checkin_photo_uuid, place.place_name FROM checkin INNER JOIN place ON checkin.checkin_place_id = place.id WHERE checkin.checkin_user_id = ".$userid." ORDER BY checkin.id DESC LIMIT 10") as $row) {
            $response[] = array(
                'ID' => $row['checkin_id'],
                'name' => $row['place_name'],
                'latitude' => $row['checkin_latitude'],
                'longitude' => $row['checkin_longitude'],
                'review' => $row['checkin_review'],
                'timestamp' => date('D, M j, \'y @ g:i a', strtotime($row['checkin_timestamp'])),
                'photoUUID' => $row['checkin_photo_uuid']
            );
        }

        $this->response = json_encode($response);
        $this->send();
    }

/*--------------------------
 * PLACE
 *-------------------------*/
    public function placeExists($data) {
        // TODO: Add functionality to check for existing CUSTOM places somehow
        $response = [];
        foreach ($this->db->query("SELECT * FROM place WHERE place_foursquare_id = \"".$data->foursquare_venue_id."\" LIMIT 1") as $row) {
            $response = array(
                'ID' => $row['id'],
                'name' => $row['place_name']
            );
        }

        return $response;
    }

    public function addPlace($data) {
        $query = $this->db->prepare("INSERT INTO place (place_foursquare_id, place_name) VALUES (:foursquare, :name)");
        $query->bindParam(':foursquare', $data->foursquare_venue_id);
        $query->bindParam(':name', $data->name);
        $query->execute();

        return $this->db->lastInsertId();
    }

/*--------------------------
 * UTILITY FUNCTIONS
 *-------------------------*/
    public function checkPrize($userid, $force = false, $direct_response = false) {
        $user = $userid;
        $limit = 10;
        $simple_roll = rand( 1,$limit );

        if( ($simple_roll < ( $limit/2 )) || $force ){
            // WIN
            $itemQuery = $this->db->prepare("SELECT * FROM item ORDER BY RAND() LIMIT 1;");
            $itemQuery->execute();
            $item = $itemQuery->fetch(PDO::FETCH_ASSOC);
            $itemID = $item['id'];

            $countQuery = $this->db->prepare("SELECT COUNT(*) AS 'count' FROM user_item WHERE item_id = $itemID;");
            $countQuery->execute();
            $uniqeItemCount = $countQuery->fetch(PDO::FETCH_ASSOC);
            $uniqueItemID = (int)$uniqeItemCount['count'];
            $uniqueItemID++;

            $query = $this->db->prepare("INSERT INTO user_item (user_id, item_id, unique_id) VALUES (:user, :item, :unique)");
            $query->bindParam(':user', $user);
            $query->bindParam(':item', $itemID);
            $query->bindParam(':unique', $uniqueItemID);
            $query->execute();

            // Remove price of 100 coins for Inventory prize button
            if($force) {
                $this->deductPrizeMoney($user, 100);
            }

            $response['prize']['success'] = true;
            $response['prize']['item'] = array(
                'unique' => $uniqueItemID,
                'name' => $item['item_name'],
                'image' => $item['item_image_location']
            );
            $response['prize']['message'] = "Congratulations, you won!";

        }else{
            // LOSE
            $response['prize']['success'] = false;
            $response['prize']['item'] = array();
            $response['prize']['message'] = "Sorry, you didn't win. Better luck next time!";
        }

        // Give 'em something!
        $response['prize']['money'] = "You found ".$this->getMoney($userid)." coins!";

        if($direct_response) {
            $this->response = json_encode($response);
            $this->send();
        }else{
            return $response;
        }
    }

    public function getMoney($userid) {
        $limit = 15;
        $money = rand( 2,$limit );

        $stmt = $this->db->prepare("UPDATE user SET money = money + $money WHERE id = $userid;");
        $result = $stmt->execute();

        return $money;
    }

    public function deductPrizeMoney($userid, $amount = 0) {
        $stmt = $this->db->prepare("UPDATE user SET money = money - $amount WHERE id = $userid;");
        $result = $stmt->execute();

        return true;
    }

    public function encrypt_decrypt($action, $string) {
        $output = false;

        $encrypt_method = "AES-256-CBC";
        $secret_key = 'trapped in time';
        $secret_iv = 'trey fish gordo page';

        // hash
        $key = hash('sha256', $secret_key);

        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        if( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        }else if( $action == 'decrypt' ){
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }

        return $output;
    }

    public function checkLoginState() {
        $userid = $_COOKIE['userid'];
        $usersession = $_COOKIE['usersession'];
        $stmt = $this->db->prepare("SELECT * FROM user WHERE id=$userid AND password=\"".$usersession."\" LIMIT 1");
        $result = $stmt->execute();

        if($result) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['loggedin'] = true;
            $response['id'] = $user['id'];
            $response['username'] = $user['username'];
            $response['money'] = $user['money'];
            $response['usersession'] = $user['password'];
        }else{
            $response['loggedin'] = false;
        }

        $this->response = json_encode($response);
        $this->send();
    }

    public function uploadPhoto() {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["checkinPhoto"]["name"]);
        $uploadOk = true;
        $photoResponse = array();

        // CHECK FILE SIZE?
        // if ($_FILES["fileToUpload"]["size"] > 500000) {
        //     echo "Sorry, your file is too large.";
        //     $uploadOk = false;
        // }

        if ( !$uploadOk ) {
            $photoResponse['message'] = "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                $photoResponse['message'] = "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
            } else {
                $photoResponse['message'] = "Sorry, there was an error uploading your file.";
            }
        }

        return $photoResponse;
    }
}
?>
