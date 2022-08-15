
<?php 

	$de = $_POST['de'];
	$para = $_POST['para'];
	$asunto = $_POST['asunto'];
	$mensaje = utf8_decode($_POST['mensaje']);

	$cabecera = 'MIME-Version: 1.0' . "\r\n";
	$cabecera .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$cabecera .= 'From: '.$de;

	$salida = '0';

	if(mail($para,$asunto,$mensaje,$cabecera))
	{
		$salida = '1';
	}
	else
	{
		$salida = '0';
	}

	echo $salida; 

?>