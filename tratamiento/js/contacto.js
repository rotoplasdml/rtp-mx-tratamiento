jQuery(document).ready(function($){
	console.log('dml:tratamiento:contacto:rdy');
	// formulario
	const form = jQuery('#tratamiento_form');
	// validacion
	jQuery(form).validate({
		rules: {
			telefono: {
				minlength: 10, 
				//maxlength: 10,
				digits: true
			}
		},
		messages: {
			nombre: {
				required: "Por favor especifica tu nombre y apellidos",
			},
			correo_electronico: {
				required: "Requerimos un correo para poder contactarte",
				email: "Tu correo debe tener un formato como: nombre@dominio.com"
			},
			telefono_movil: {
				required: "Por favor especifica tu teléfono",
				minlength: "Deben ser al menos 10 dígitos",
				maxlength: "Solo pueden ser 10 dígitos",
				digits: "Este campo solo puede contener números"
			},
			estado: {
				required: "Por favor especifica el estado donde te encuentras",
			},
			eres: {
				required: "Por favor selecciona una opción",
			},
			sector: {
				required: "Por favor selecciona una opción",
			},
			producto_interes: {
				required: "Por favor selecciona una opción",
			},
			politica_terminos: {
				required: "Por favor acepta la Política de privacidad y los términos de servicio",
			},
		},
		submitHandler: function(form) {
			console.log('f:sendForm');
			// desactivar boton de envio
			jQuery('#spinner-border').fadeToggle(300);
			jQuery('#tratamiento_form_submit').prop('disabled',true);
			// AKfycbwfGx_mV-wI7Xzw8flbX1unUfNKXAQCkYyki-tzkFAYSKD1YE10hN_ELXceJmbAcL0-mA
			// https://script.google.com/macros/s/AKfycbwfGx_mV-wI7Xzw8flbX1unUfNKXAQCkYyki-tzkFAYSKD1YE10hN_ELXceJmbAcL0-mA/exec
			// url de AppSctips
			const scriptURL = 'https://script.google.com/macros/s/AKfycbwfGx_mV-wI7Xzw8flbX1unUfNKXAQCkYyki-tzkFAYSKD1YE10hN_ELXceJmbAcL0-mA/exec';
			const sendMail = '/tratamiento/scripts/sm.php';
			// fecha y hora
			const t = new Date();
			const date = ('0' + t.getDate()).slice(-2);
			const month = ('0' + (t.getMonth() + 1)).slice(-2);
			const year = t.getFullYear();
			const hours = ('0' + t.getHours()).slice(-2);
			const minutes = ('0' + t.getMinutes()).slice(-2);
			const seconds = ('0' + t.getSeconds()).slice(-2);
			const fecha = `${date}/${month}/${year}`;
			const hora = `${hours}:${minutes}:${seconds}`;
			document.getElementById('fecha').value = fecha;
			document.getElementById('hora').value = hora;
			// envio
			fetch(
				scriptURL, {
					method: 'POST', 
					body: new FormData(form)
				}
			)
			.then(function(response) {
				if (!response.ok) {
					throw new Error('Error en la primera solicitud');
				}
				return response; 
			})
			.then(function(data1) {
				return fetch(
					sendMail, {
						method: 'POST',
						body: new FormData(form)
					}
				);
			})
			.then(function(sendmail) {
				// Verifica si la respuesta fue exitosa
				if (!sendmail.ok) {
					throw new Error('Error en la solicitud de enviar el correo');
				}
				// Convertimos la respuesta a JSON
				return sendmail.json();
			})
			.then(function(sendmail) {
				// Revisamos si succes es true
                if (sendmail.success) {
					form.reset();
                    jQuery('#spinner-border').fadeToggle(300);
					jQuery('#tratamiento_form_submit').prop('disabled',false);
					alert('Tu mensaje ha sido enviado. En breve uno de nuestros asesores se comunicará contigo');
                } else {
                    // Mensaje de error
                    console.log(sendmail.message);
                }
			})
			.catch(error => console.error('Error!', error.message));
		}
	});

});

// detectar errores reload
window.onerror = function(message, source, lineno, colno, error) {
    localStorage.setItem('lastError', JSON.stringify({
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        error: error.toString()
    }));
    // Retornar true para prevenir la recarga
    return true;
};
window.onload = function() {
    var error = localStorage.getItem('lastError');
    if (error) {
        console.log('Último error: ', JSON.parse(error));
        localStorage.removeItem('lastError');
    }
};