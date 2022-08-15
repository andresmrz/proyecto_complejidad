$(document).ready(main);

var contador = 1;
var tamanioMin = 1100;

function main()
{
	$('.boton-menu').click(function()
	{
		// $('nav').toggle();

		if(document.body.clientWidth <= tamanioMin)
		{
			if(contador === 1)
			{
				$('nav').animate({
					left: '0'
				});

				contador = 0;
			}
			else
			{
				$('nav').animate({
					left: '-100%'
				});
				contador = 1;
			}
		}
	});

	$(window).resize(function()
	{
	  	if(document.body.clientWidth > tamanioMin)
	  	{
	  		document.getElementById('contenedor-menu-nav').style = '';
	  		$('#contenedor-menu').removeClass('contenedor-menu');
        	$('#contenedor-menu').addClass('contenedor-menu');
        	contador = 1;
	  	}
	});
}

function verificarMenu()
{
	if(document.body.clientWidth <= tamanioMin && contador === 0)
	{
		ocultarMenu();
	}
}

function ocultarMenu()
{
	$('nav').animate({
		left: '-100%'
	});
	contador = 1;
}

function mostrarMenu()
{
	$('nav').animate({
		left: '0'
	});

	contador = 0;
}