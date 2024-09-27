jQuery(document).ready(function() {
	console.log('rdy:industria:menu');

	includeHTML();

	$('#submenu_productos > a').click(function(e) {
		console.log('click');
		e.preventDefault();
		$(this).next('.submenu_contenido').slideToggle();
		//1261 > 1416
		/* if ( $(window).width() >= 1101 ) {
			$('.submenu_contenido').css({
				'visibility':'visible',
				'opacity':'1',
				'transition-delay':'0s'
			});

			$(this).next('.submenu_contenido').slideDown();
		} */
	});

	// cerrar
	$('.submenu_contenido_cerrar').click(function() {
		$('.submenu_contenido:visible').slideToggle();
	});
	$(document).keyup(function(e) {
		if (e.key === "Escape") {
			$('.submenu_contenido:visible').slideToggle();
		}
	});

	// mostrar menu en movil
	var contador = 1;
	$('#menu_barra_label').click(function() {
		console.log('click');
		if (contador == 1) {
			//$('#menu_principal').css('display','inline-block');
			$('#menu_principal').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('#menu_principal').animate({
				left: '-100%'
			}, function(){
				$('#menu_principal').css('display','none');
			});
		}
	});

	// ocultar menu en scroll
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		var currentWidth = document.documentElement.clientWidth;
		//console.log(currentScrollPos);
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("menu_contenedor").style.top = "0";
		} else {
			document.getElementById("menu_contenedor").style.top = "-92px";
		}
		prevScrollpos = currentScrollPos;
	}
});