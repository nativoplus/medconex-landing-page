<?php


$senderEmail = 'support@nativoplus.studio';
$ToEmail = $_POST["email"];

$EmailSubject = 'User Contact Information';
	$mailheader = "From: ".$_POST["email"]."\r\n";
		$mailheader .= "Reply-To: ".$_POST["email"]."\r\n";
$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n";
$MESSAGE_BODY = '<table style=" background:#F4F4F4 ; text-align : center">
	
	<tr>
		<th colspan="2" style="padding:10px;">
			<b>Contact Details</b>
		</th>
	</tr>
	<tr>
		<td style="padding:10px;">
			<b>Name:</b>
		</td>
		<td style="padding:10px;">'.$_POST["name"].'</td>
	</tr>
	<tr>
		<td style="padding:10px;">
			<b>E-mail:</b>
		</td>
		<td style="padding:10px;">'.$_POST["email"].'</td>
	</tr>
	<tr>
		<td style="padding:10px;">
			<b>Contact:</b>
		</td>
		<td style="padding:10px;">'.$_POST["phone"].'</td>
	</tr>
	<tr>
		<td style="padding:10px;">
			<b>Message:</b>
		</td>
		<td style="padding:10px;">'.$_POST["message"].'</td>
	</tr>
	
	
	<tr>
		<th colspan="2" style="padding:10px;">
			<b>Thank you for contacting us.</b>
		</th>
	</tr>
	<tr>
		<td colspan="2" style="padding:10px;">
			You are very important to us, all information received will always remain confidential.
		</td>
		
	</tr>
</table>';

$service_url = 'http://localhost:53579/api/v1/Email/send_email';
$curl = curl_init($service_url);
$curl_post_data = array(
		'to' => array($ToEmail),
		'subject' => $EmailSubject,
		'html' => $MESSAGE_BODY,
		'senderEmail' => $senderEmail,
		'senderName' => 'Med Connex Support'
);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);

$curl_response = curl_exec($curl);
if ($curl_response === false) {
	$info = curl_getinfo($curl);
	curl_close($curl);
	die('error occured during curl exec. Additioanl info: ' . var_export($info));
}
curl_close($curl);
$decoded = json_decode($curl_response);
if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
	die('error occured: ' . $decoded->response->errormessage);
}
echo 'response ok!';
var_export($decoded->response);
	
?>