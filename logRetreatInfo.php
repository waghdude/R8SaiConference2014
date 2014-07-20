<?PHP

	if($_POST )
	{
		extract($_POST);

		$l1 = $groupfamilyname . ", " . $name . "\t" . $age . " " . $phone . " " . $altphone . " " . $email . " " . $center . "\t" . $totalcost;
		$l2 = $groupfamilyname . ", " . $name . "\tsat: " . $sat . " sun: " . $sun . " satlunch: " . $satlunch . " satdinner: " . $satdinner . " sunlunch: " . $sunlunch . " sundinner: " . $sundinner;
		$l3 = $groupfamilyname . ", " . $name . "\taddress: " . $address . " " . $city . " " . $state . " " . $zip;
		
		$line = $l1 . "\n\t\t" . $l2 . "\n\t\t" . $l3;

		if($fp = fopen("{$_SERVER['DOCUMENT_ROOT']}/Conference/2014/retreatInfo.txt", "a"))
		{
			fwrite($fp, date("M d H:i:s") . " $line\n\n");
			fclose($fp);
		}
		
		// post to Google
		$url = "https://docs.google.com/forms/d/1QeCq3i5-yayVUalG8zULImKBt1IZpW4DN3dvWvldgbM/formResponse";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, true);
		
		$data = array	(
				"entry.1028821986"  => $groupfamilyname,
				"entry.1989572619"  => $name,
				"entry.1455524712"  => $age,
				"entry.1692495978"  => $sat,
				"entry.1063897397"  => $sun,
				"entry.1808741032"  => $satlunch,
				"entry.28805167"    => $sunlunch,
				"entry.1762204858"  => $satdinner,
				"entry.2083881354"  => $sundinner,
				"entry.384955973"  	=> $address,
				"entry.182164071"   => $city,
				"entry.2144561875"  => $state,
				"entry.1511475308"  => $zip,
				"entry.501938484"   => $phone,
				"entry.548996382"   => $altphone,
				"entry.161421504"   => $email,             
				"entry.1206432407"  => $center, 
				"entry.1868561769"  => $totalcost
		);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$output = curl_exec($ch);
		$info = curl_getinfo($ch);
		curl_close($ch);
		
	}
	
	$response = '<?xml version="1.0" encoding="utf-8" <response><status>OK</status></response>';
	
	header("Content-type: text/xml; charset=utf-8");
	echo $response;
	
?>