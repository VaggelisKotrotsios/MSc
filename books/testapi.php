<?php
/**
 * Created by PhpStorm.
 * User: Vaggelis Kotrotsios
 * Date: 10/23/2017
 * Time: 9:00 PM
 */
require_once "../config.php";

$sql = "select * from users where users.id = 1";
$row = $db->getRecord($sql);

print_r($row);
//$page = file_get_contents("https://www.googleapis.com/books/v1/volumes?q=isbn:9789381141977");
//
//$data = json_decode($page, true);
//
//echo "Title = " . $data['items'][0]['volumeInfo']['title'];
//echo "Authors = " . @implode(",", $data['items'][0]['volumeInfo']['authors']);
//echo "Pagecount = " . $data['items'][0]['volumeInfo']['pageCount'];