<?php
	// Incluir los archivos necesarios de PHPMailer
	require 'vendor/phpmailer/phpmailer/src/Exception.php';
	require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
	require 'vendor/phpmailer/phpmailer/src/SMTP.php';
	// Uso
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	// Cargar automáticamente las dependencias de Composer
	require 'vendor/autoload.php';
	// Instancia de PHPMailer
	$mail = new PHPMailer(true);
	// variables post
	$fecha = $_POST['fecha'];
	$hora = $_POST['hora'];
	$nombre = $_POST['nombre'];
	$correo = $_POST['correo_electronico'];
	$telefono = $_POST['telefono_movil'];
	$estado = $_POST['estado'];
	$eres = $_POST['eres'];
	$sector = $_POST['sector'];
	$producto = $_POST['producto_interes'];
	$detalles = $_POST['detalles_adicionales'];
	$politica = $_POST['politica_terminos'];
	// Proceso de envio
	try {
		$mail->isSMTP();
		// Configuracion PHPMailer Productivo
		$mail->Host       = '191.119.2.217';
		$mail->SMTPAuth   = false;
		$mail->SMTPSecure = false;
		$mail->Port       = 25;
		// Configuracion PHPMailer Local
		/* $mail->Host 		= 'sandbox.smtp.mailtrap.io';
		$mail->SMTPAuth 	= true;
		$mail->Port 		= 2525;
		$mail->Username 	= 'c57e4da1119bd7';
		$mail->Password 	= 'cfbc0929d4d085'; */
		// Enviador
		$mail->setFrom('noreply@rotoplas.com', 'Rotoplas Tratamiento');
		// Añadir un destinatario
		$mail->addAddress('cdperez@rotoplas.com');
		// Copia
		$mail->addCC('jarguelles@dml.mx', 'Jorge DML');
		// Configuración de la codificación
		$mail->CharSet = 'UTF-8';
		// Establecer el formato del correo como HTML
		$mail->isHTML(true);
		// Contenido del correo
		$mail->Subject = 'Contacto de Rotoplas Tratamiento';
		$mail->Body    = "
			<!DOCTYPE html>
			<html lang='es-MX'>
			<head>
				<meta charset='UTF-8'>
				<style>
					body {
						font-family: Arial, Helvetica, sans-serif;
						color: #002554;
						padding: 2rem;
						margin: 0;
					}
				</style>
			</head>
			<body>
				<b>Fecha / hora:</b><br>
				$fecha - $hora<br>
				<b>Nombre y apellido:</b><br>
				$nombre <br>
				<b>Correo electrónico:</b><br>
				$correo <br>
				<b>Teléfono móvil:</b><br>
				$telefono <br>
				<b>Estado:</b><br>
				$estado <br>
				<b>Eres:</b><br>
				$eres <br>
				<b>Sector:</b><br>
				$sector <br>
				<b>Producto de interés:</b><br>
				$producto <br>
				<b>Detalles adicionales:</b><br>
				$detalles <br>
				<b>Política de privacidad y términos de servicio:</b><br>
				$politica <br>
			</body>
			</html>
		";
		// Envio
		$mail->send();
		// Respuesta echo 'El mensaje ha sido enviado';
		//echo 'El mensaje ha sido enviado';
		$response['success'] = true;
		$response['message'] = "Correo enviado";
	} catch (Exception $e) {
		//echo "El mensaje no pudo ser enviado. Mailer Error: {$mail->ErrorInfo}";
		$response['message'] = "El mensaje no pudo ser enviado. Error: {$phpmailer->ErrorInfo}";
	}
	// Cabecera
	header('Content-Type: application/json');
	// Respuesta
	echo json_encode($response);
?>