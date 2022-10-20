<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
    
    //$url = 'https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=0a468afc7821509f06202cd63b78c3c2&units=metric';
    $url = 'https://api.openweathermap.org/data/2.5/weather?lat='.$_REQUEST['lat'].'&lon=' .$_REQUEST['lng']. '&appid=0a468afc7821509f06202cd63b78c3c2&units=metric';
    


    $ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);
 
	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['weather'] = $decode['main'];
	$output['results'] = $decode['weather'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>

