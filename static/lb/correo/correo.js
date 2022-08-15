
function correo_enviar(de,para,asunto,mensaje,funciones)
{
	mensaje = mensaje.replace(/\n/g, "<br />");

	$.ajax(
	{
        type: 'POST',
        url: "lb/correo/correo.php",
        data: ('de=' + de + '&para=' + para + '&asunto=' + asunto + '&mensaje=' + mensaje),
        success: function(respuesta)
        {
        	if(parseInt(respuesta) == 1)
        	{
        		console.log('Se ha enviado el correo');

        		if(funciones != undefined)
        		{
        			if(funciones['si'] != undefined)
        			{
        				var ejecutar = funciones['si'];
        				ejecutar();
        			}
        		}
        	}
        	else
        	{
        		console.log('No se ha podido enviar el correo.');
        		console.log(respuesta);

        		if(funciones != undefined)
        		{
        			if(funciones['no'] != undefined)
        			{
        				var ejecutar = funciones['no'];
        				ejecutar();
        			}
        		}
        	}
        }
    });
}
