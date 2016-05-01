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

                    default:
                        $this->error('Unsupported request method');
                        break;
                }

                break;
            case 'Utilities':
                switch ($this->request[1]) {
                    case 'checkPrize':
                        $this->checkPrize($data);
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
        $stmt = $this->db->prepare("SELECT * FROM user WHERE username=\"$data['username']\" LIMIT 1");
        $result = $stmt->execute();
        if($result) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            //if( $this->encrypt_decrypt('encrypt',$data['password']) == $user['password']){
            if( $data['password'] == $user['password']){
                $response['loggedin'] = true;
                $response['message'] = "Success! Logging in...";
                setcookie( "userid", $user['id'], strtotime( '+7 days' ) );
                setcookie( "usersession", $user['password'], strtotime( '+7 days' ) );
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

        $query = $this->db->prepare("INSERT INTO checkin (checkin_user_id, checkin_place_id, checkin_latitude, checkin_longitude, checkin_review) VALUES (:user, :place, :latitude, :longitude, :review)");
        $query->bindParam(':user', $data->user_id);
        $query->bindParam(':place', $place_id);
        $query->bindParam(':latitude', $data->latitude);
        $query->bindParam(':longitude', $data->longitude);
        $query->bindParam(':review', $data->review);
        $query->execute();

        $response = $this->checkPrize();
        $this->response = json_encode($response);
        $this->send();
    }

    public function getCheckinCollection() {
        foreach ($this->db->query("SELECT checkin.id as 'checkin_id', checkin.checkin_latitude, checkin.checkin_longitude, checkin.checkin_review, checkin.checkin_timestamp, place.place_name FROM checkin INNER JOIN place ON checkin.checkin_place_id = place.id ORDER BY checkin.id DESC LIMIT 10") as $row) {
            $response[] = array(
                'ID' => $row['checkin_id'],
                'name' => $row['place_name'],
                'latitude' => $row['checkin_latitude'],
                'longitude' => $row['checkin_longitude'],
                'review' => $row['checkin_review'],
                'timestamp' => date('D, M j, \'y @ g:i a', strtotime($row['checkin_timestamp']))
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
    public function checkPrize() {
        $user = 1;
        $limit = 10;
        $simple_roll = rand( 1,$limit );

        if( $simple_roll < ( $limit/2 ) ){
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

        return $response;
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
        $stmt = $this->db->prepare("SELECT * FROM user WHERE id=$userid AND password=$usersession LIMIT 1");
        $result = $stmt->execute();
        if($result) {
            $loggedin = true;
        }else{
            $loggedin = false;
        }

        $response = array(
            'loggedin' => $loggedin
        );

        $this->response = json_encode($response);
        $this->send();
    }
}
?>
