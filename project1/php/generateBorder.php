<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    //$url = 'https://api.opencagedata.com/geocode/v1/json?key=8ef5df3148ff46709c0b94b607f53f71&q=52.3877830%2C9.7334394&pretty=1';
    //$url = 'https://api.opencagedata.com/geocode/v1/json?q=51.5755898%2C%200.5381136&key=8ef5df3148ff46709c0b94b607f53f71&language=en&pretty=1'
    $url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['lat'] . '%2C%20%200' .$_REQUEST['lng'] . '&key=8ef5df3148ff46709c0b94b607f53f71&pretty=1';
	//$url = 'https://api.opencagedata.com/geocode/v1/json?q=51.5756253%2C%20%200.5381134&key=8ef5df3148ff46709c0b94b607f53f71&language=en&pretty=1';

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
	$output['results'] = $decode['results'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>
