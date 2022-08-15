
var cargando_path_admin = '';

function cargando_admin()
{
    cargando_path_admin = '../';
}

function cargando_done(texto,ver,funcion)
{
	if(document.getElementById('calidad_admin'))
	{
		cargando_path_admin = document.getElementById('calidad_admin').value;
	}

	if(!document.getElementById('cargando-contenedor-principal'))
	{
		var div = document.createElement("div");
	    div.id = 'cargando-contenedor-principal';

	    document.body.appendChild(div);
	}

    $('#cargando-contenedor-principal').load(cargando_path_admin + 'lb/cargando/cargando.php',{texto:texto,admin:(cargando_path_admin == '')?'0':'1'},function()
    {
        if(ver == undefined)
        {
        	mostrar('cargando-contenedor-principal');
        }
        else
        {
        	if(ver)
        	{
        		mostrar('cargando-contenedor-principal');
        	}
        	else
        	{
        		ocultar('cargando-contenedor-principal');
        	}
        }

        if(funcion != undefined)
        {
            funcion();
        }
    });
}

function cargando_ocultar()
{
	ocultar('cargando-contenedor-principal');
}

