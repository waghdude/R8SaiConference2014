<?PHP

	if($_POST )
	{
		$line = "";
		
		if ( isset($_POST['msg1']) )
		{
			$line = $_POST['msg1'];
		}
			
		if ( isset($_POST['msg2']) )
		{
			$line = $line . "\n\t\t" . $_POST['msg2'];
		}
			
		if ( isset($_POST['msg3']) )
		{
			$line = $line . "\n\t\t" . $_POST['msg3'];
		}
			
		if($fp = fopen("{$_SERVER['DOCUMENT_ROOT']}/Conference/2014/retreatInfo.txt", "a"))
		{
			fwrite($fp, date("M d H:i:s") . " $line\n");
			fclose($fp);
		}
	}
	
	$response = '<?xml version="1.0" encoding="utf-8" <response><status>OK</status></response>';
	
	header("Content-type: text/xml; charset=utf-8");
	echo $response;
	
?>