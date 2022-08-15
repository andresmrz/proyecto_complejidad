let cantidad_filas = 20;

function paginacion(id, datos)
{
    var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');

    var cantidad = (datos['cantidad'] != undefined)?datos['cantidad']:datosTabla.length;
    var paginas = ((cantidad % cantidad_filas) == 0)?(cantidad / cantidad_filas):(((cantidad - (cantidad % cantidad_filas)) / cantidad_filas) + 1);

    for(var i = 0;i < datosTabla.length;i++)
    {
        var fila = datosTabla[i];
        var pagina = (((i + 1) % cantidad_filas) == 0)?((i + 1) / cantidad_filas):((((i + 1) - ((i + 1) % cantidad_filas)) / cantidad_filas) + 1);
        fila.dataset.pagina = pagina;

        if(pagina != 1)
        {
            fila.style.display = 'none';
        }
    }

    paginacion_done(id, cantidad, datos['filtro']);
}

function paginacion_done(id, cantidad, filtro, total_filas)
{
    if(total_filas != undefined)
    {
        cantidad_filas = total_filas;
    }

	var objeto = document.getElementById(id + '-paginacion');
	var paginas = ((cantidad % cantidad_filas) == 0)?(cantidad / cantidad_filas):(((cantidad - (cantidad % cantidad_filas)) / cantidad_filas) + 1);

	objeto.min = 1;
	objeto.max = paginas;

    if(document.getElementById(id + '-paginacion-down'))
    {
        document.getElementById(id + '-paginacion-down').min = 1;
        document.getElementById(id + '-paginacion-down').max = paginas;
    }

	objeto.dataset.cantidad = cantidad;
	objeto.dataset.pagina = 1;
	objeto.dataset.paginas = paginas;
	objeto.dataset.filtro = '';

	if(cantidad > 0)
	{
		if(filtro == undefined)
		{
			objeto.dataset.cantidadInicial = cantidad;
			$('#' + id + '-total').val('1 a ' + ((cantidad >= cantidad_filas)?cantidad_filas:cantidad) + ' de ' + cantidad + ' registros');
		}
		else
		{
			objeto.dataset.filtro = 'true';
			$('#' + id + '-total').val('1 a ' + ((cantidad >= cantidad_filas)?cantidad_filas:cantidad) + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
		}

		$('#' + id + '-info-paginacion').val('Pagina 1 de ' + paginas);

        if(document.getElementById(id + '-paginacion-down'))
        {
            if(filtro == undefined)
            {
                objeto.dataset.cantidadInicial = cantidad;
                $('#' + id + '-total-down').val('1 a ' + ((cantidad >= cantidad_filas)?cantidad_filas:cantidad) + ' de ' + cantidad + ' registros');
            }
            else
            {
                objeto.dataset.filtro = 'true';
                $('#' + id + '-total-down').val('1 a ' + ((cantidad >= cantidad_filas)?cantidad_filas:cantidad) + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
            }

            $('#' + id + '-info-paginacion-down').val('Pagina 1 de ' + paginas);
        }
	}
	else
	{
		$('#' + id + '-total').val('No hay registros');
		$('#' + id + '-info-paginacion').val('No hay registros');

        if(document.getElementById(id + '-paginacion-down'))
        {
            $('#' + id + '-total-down').val('No hay registros');
            $('#' + id + '-info-paginacion-down').val('No hay registros');
        }
	}
}

function paginacion_atras(id, ultima)
{
	var objeto = document.getElementById(id + '-paginacion');

	var cantidad = parseInt(objeto.dataset.cantidad);
	var pagina = parseInt(objeto.dataset.pagina);
	var paginas = parseInt(objeto.dataset.paginas);
	var filtro = (objeto.dataset.filtro == '')?undefined:true;

	if(cantidad > 0)
	{
		var nuevaPagina = (ultima)?1:(pagina - 1);

		if(nuevaPagina > 0 && nuevaPagina <= paginas)
		{
			var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');
			var inicio = ((nuevaPagina - 1) * cantidad_filas) + 1;
			var fin = ((nuevaPagina * cantidad_filas) <= cantidad)?(nuevaPagina * cantidad_filas):cantidad;

			for(var i = 0;i < datosTabla.length;i++)
            {
                var fila = datosTabla[i];
                var ver = (parseInt(fila.dataset.pagina) == nuevaPagina)?true:false;

                if(ver)
                {
                    fila.style.display = 'table-row';
                }
                else
                {
                    fila.style.display = 'none';
                }
            }

            objeto.dataset.pagina = nuevaPagina;
            
			if(filtro == undefined)
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
			}
			else
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
			}

			$('#' + id + '-info-paginacion').val('Pagina ' + nuevaPagina + ' de ' + paginas);

            if(document.getElementById(id + '-paginacion-down'))
            {
                if(filtro == undefined)
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
                }
                else
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
                }

                $('#' + id + '-info-paginacion-down').val('Pagina ' + nuevaPagina + ' de ' + paginas);
            }
		}
	}
}

function paginacion_ir_to_pagina(id, valor)
{
    var down = (valor == 'down')?'-down':'';
    valor = (valor == 'down')?undefined:valor;   

	var objeto = document.getElementById(id + '-paginacion');

	var cantidad = parseInt(objeto.dataset.cantidad);
	var pagina = parseInt(objeto.dataset.pagina);
	var paginas = parseInt(objeto.dataset.paginas);
	var filtro = (objeto.dataset.filtro == '')?undefined:true;

	if(cantidad > 0)
	{
		var nuevaPagina = (valor == undefined)?parseInt(document.getElementById(id + '-paginacion' + down).value):valor;

		if(nuevaPagina > 0 && nuevaPagina <= paginas)
		{
			var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');
			var inicio = ((nuevaPagina - 1) * cantidad_filas) + 1;
			var fin = ((nuevaPagina * cantidad_filas) <= cantidad)?(nuevaPagina * cantidad_filas):cantidad;

			for(var i = 0;i < datosTabla.length;i++)
            {
                var fila = datosTabla[i];
                var ver = (parseInt(fila.dataset.pagina) == nuevaPagina)?true:false;

                if(ver)
                {
                    fila.style.display = 'table-row';
                }
                else
                {
                    fila.style.display = 'none';
                }
            }

            objeto.dataset.pagina = nuevaPagina;

            if(filtro == undefined)
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
			}
			else
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
			}

			$('#' + id + '-info-paginacion').val('Pagina ' + nuevaPagina + ' de ' + paginas);

            if(document.getElementById(id + '-paginacion-down'))
            {
                if(filtro == undefined)
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
                }
                else
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
                }

                $('#' + id + '-info-paginacion-down').val('Pagina ' + nuevaPagina + ' de ' + paginas);
            }
		}
	}
}

function paginacion_siguiente(id, ultima)
{
	var objeto = document.getElementById(id + '-paginacion');

	var cantidad = parseInt(objeto.dataset.cantidad);
	var pagina = parseInt(objeto.dataset.pagina);
	var paginas = parseInt(objeto.dataset.paginas);
	var filtro = (objeto.dataset.filtro == '')?undefined:true;

	if(cantidad > 0)
	{
		var nuevaPagina = (ultima)?paginas:(pagina + 1);

		if(nuevaPagina > 0 && nuevaPagina <= paginas)
		{
			var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');
			var inicio = ((nuevaPagina - 1) * cantidad_filas) + 1;
			var fin = ((nuevaPagina * cantidad_filas) <= cantidad)?(nuevaPagina * cantidad_filas):cantidad;

			for(var i = 0;i < datosTabla.length;i++)
            {
                var fila = datosTabla[i];
                var ver = (parseInt(fila.dataset.pagina) == nuevaPagina)?true:false;

                if(ver)
                {
                    fila.style.display = 'table-row';
                }
                else
                {
                    fila.style.display = 'none';
                }
            }

            objeto.dataset.pagina = nuevaPagina;

            if(filtro == undefined)
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
			}
			else
			{
				$('#' + id + '-total').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
			}

			$('#' + id + '-info-paginacion').val('Pagina ' + nuevaPagina + ' de ' + paginas);

            if(document.getElementById(id + '-paginacion-down'))
            {
                if(filtro == undefined)
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' registros');
                }
                else
                {
                    $('#' + id + '-total-down').val(inicio + ' a ' + fin + ' de ' + cantidad + ' (filtrados de ' + objeto.dataset.cantidadInicial + ')');
                }

                $('#' + id + '-info-paginacion-down').val('Pagina ' + nuevaPagina + ' de ' + paginas);
            }
		}
	}
}

function paginacion_filtrar_tabla(tabla, valor, claseFila)
{
    var contador = 0;
    valor = valor.toLowerCase();
    var objeto = document.getElementById(tabla + '-paginacion');
    var datosTabla = document.querySelectorAll('#' + tabla + ' tbody tr');
    var total = datosTabla.length;

    if(valor.trim() != '')
    {
        if(valor.length >= 4)
        {
            for(var i = 0;i < datosTabla.length;i++)
            {
                var fila = datosTabla[i];

                if(claseFila != undefined)
                {
                    fila.classList.remove(claseFila);
                }

                var seguir = true;

                for(var j = 0;j < fila.children.length && seguir;j++)
                {
                    var celda = (fila.children[j].textContent).toLowerCase();
                    var datosCelda = celda.split(valor);

                    if(datosCelda.length > 1)
                    {
                        seguir = false;
                    }
                }

                if(seguir)
                {
                    fila.style.display = 'none';
                    fila.dataset.pagina = '';
                    total--;
                }
                else
                {
                    contador++;
                    var pagina = ((contador % cantidad_filas) == 0)?(contador / cantidad_filas):(((contador - (contador % cantidad_filas)) / cantidad_filas) + 1);
                    fila.dataset.pagina = pagina;

                    if(pagina == 1)
                    {
                    	fila.style.display = 'table-row';
                    }
                    else
                    {
                    	fila.style.display = 'none';
                    }

                    if(claseFila != undefined)
                    {
                        if((contador % 2) == 0)
                        {
                            fila.classList.add(claseFila);
                        }
                    }
                }
            }

            paginacion_done(tabla,contador,true);
        }
        else
        {
            total = datosTabla.length;

            for(var i = 0;i < datosTabla.length;i++)
            {
                contador++;
                var pagina = ((contador % cantidad_filas) == 0)?(contador / cantidad_filas):(((contador - (contador % cantidad_filas)) / cantidad_filas) + 1);
                var fila = datosTabla[i];
                fila.dataset.pagina = pagina;

                if(claseFila != undefined)
                {
                    fila.classList.remove(claseFila);

                    if((contador % 2) == 0)
                    {
                        fila.classList.add(claseFila);
                    }
                }

                if(pagina == 1)
                {
                	fila.style.display = 'table-row';
                }
                else
                {
                	fila.style.display = 'none';
                }
            }

            var pagina = parseInt(objeto.dataset.pagina);

            paginacion_done(tabla,contador);

            if(pagina != 1)
            {
                paginacion_ir_to_pagina(tabla, pagina);
            }
        }
    }
    else
    {
        total = datosTabla.length;

        for(var i = 0;i < datosTabla.length;i++)
        {
            contador++;
            var pagina = ((contador % cantidad_filas) == 0)?(contador / cantidad_filas):(((contador - (contador % cantidad_filas)) / cantidad_filas) + 1);
            var fila = datosTabla[i];
            fila.dataset.pagina = pagina;

            if(claseFila != undefined)
            {
                fila.classList.remove(claseFila);

                if((contador % 2) == 0)
                {
                    fila.classList.add(claseFila);
                }
            }

            if(pagina == 1)
            {
            	fila.style.display = 'table-row';
            }
            else
            {
            	fila.style.display = 'none';
            }
        }

        var pagina = parseInt(objeto.dataset.pagina);

        paginacion_done(tabla,contador);

        if(pagina != 1)
        {
            paginacion_ir_to_pagina(tabla, pagina);
        }
    }
}

function paginacion_redone(id, cantidad, claseFila)
{
	var objeto = document.getElementById(id + '-paginacion');
	var valor = $('#' + id + '-buscar').val();

	var pagina = parseInt(objeto.dataset.pagina);
	var paginas = ((cantidad % cantidad_filas) == 0)?(cantidad / cantidad_filas):(((cantidad - (cantidad % cantidad_filas)) / cantidad_filas) + 1);

	paginacion_filtrar_tabla(id,valor,claseFila)

	if(pagina < 1 || pagina > paginas)
	{
		paginacion_ir_to_pagina(id,(pagina - 1));
	}
	else
	{
		paginacion_ir_to_pagina(id,pagina);
	}
}


