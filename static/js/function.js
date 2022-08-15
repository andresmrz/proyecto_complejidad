
var lista_municipios = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

function insertar_fila(id)
{
    var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');

    var municipio = $('#municipio').val();
    var este = $('#este').val();
    var norte = $('#norte').val();

    var id_fila = 'fila_' + get_date();

    var cell_cantidad = '<td class="text-center">' + (datosTabla.length + 1) + '</td>';
    var cell_municipio  = '<td>' + municipio + '</td>';
    var cell_este  = '<td class="text-center">' + este + '</td>';
    var cell_norte  = '<td class="text-center">' + norte + '</td>';
    var cell_botones = '<td class="text-center">'
                        + '<button class="btn btn-default" title="Eliminar" onclick="eliminar_fila('+ "'" + id_fila + "'" + ')"><span class="fas fa-trash"></span></button>'
                        + '</td>';

    $('#' + id + '>tbody').append('<tr id="' + id_fila + '">' + cell_cantidad + cell_municipio + cell_este + cell_norte + cell_botones + '</tr>');

    actualizar_plano(id);

    generarClick('boton-reset');
}

function eliminar_fila(id)
{
    document.getElementById(id).remove();

    actualizar_plano('datos-tabla');
}

function actualizar_plano(id)
{
    var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');

    if(datosTabla.length > 0)
    {
        var min = 0;
        var max = 0;
        var puntos = new Array();

        for(var i = 0;i < datosTabla.length;i++)
        {
            var fila = datosTabla[i];
            var este = parseFloat(fila.children[2].textContent);
            var norte = parseFloat(fila.children[3].textContent);

            puntos.push([este, norte]);

            if(i == 0)
            {
                min = este;
                max = este;
            }
            else
            {
                if(este < min)
                {
                    min = este;
                }

                if(este > max)
                {
                    max = este;
                }
            } 
        }

        var parametros = 
        {
            min: min,
            max: max,
            puntos: JSON.stringify(puntos)
        };

        $.ajax(
        {
            type: 'POST',
            url: 'plano',
            data: parametros,
            success: function(respuesta)
            {
                document.getElementById('plano').innerHTML = respuesta;
            }
        });
    }
    else
    {
        ocultar('plano');
    }
}

function modelo_aleatorio(id)
{
    for(var i = 0; i < 10;i++)
    {
        var municipio = lista_municipios[i];
        var este = Math.floor(Math.random() * 10);
        var norte = Math.floor(Math.random() * 10);

        var id_fila = 'fila_' + (i + 1) + '_' + get_date();

        var cell_cantidad = '<td class="text-center">' + (i + 1) + '</td>';
        var cell_municipio  = '<td>' + municipio + '</td>';
        var cell_este  = '<td class="text-center">' + este + '</td>';
        var cell_norte  = '<td class="text-center">' + norte + '</td>';
        var cell_botones = '<td class="text-center">'
                            + '<button class="btn btn-default" title="Eliminar" onclick="eliminar_fila('+ "'" + id_fila + "'" + ')"><span class="fas fa-trash"></span></button>'
                            + '</td>';

        $('#' + id + '>tbody').append('<tr id="' + id_fila + '">' + cell_cantidad + cell_municipio + cell_este + cell_norte + cell_botones + '</tr>');
    }

    add_text_console('Se cargo un modelo con datos aleatorios');

    actualizar_plano(id);
}

function cargar_modelo_verificar_file(event, formatos)
{
    if(event.target.files.length == 1)
    {
        var file = event.target.files[0];
        var filename = file.name;
        var size = ((file.size / 1024) / 1024);

        var t = filename.toString().length;
        var formato = (filename.substring(filename.lastIndexOf(".") + 1)).toLowerCase();

        var cumple = false;
        var info = '';

        for(var i = 0;i < formatos.length;i++)
        {
            if(formatos[i] == formato)
            {
                cumple = true;
            }

            if(info != '')
            {
                if(i == (formatos.length - 1))
                {
                    info += ' y ';
                }
                else
                {
                    info += ', ';
                }
            }

            info += formatos[i];
        }

        if(cumple)
        {
            if(size <= 8)
            {
                var reader = new FileReader();

                reader.onload = function(event)
                {
                    var datos_municipios = '';
                    var fileContentArray = this.result.split(/\r\n|\n/);

                    for(var line = 0; line < fileContentArray.length; line++)
                    {
                        if(line >= 2)
                        {
                            datos_municipios += fileContentArray[line];
                        }
                    }

                    var text_municipios = datos_municipios.split('=');
                    var puntos = obtener_puntos_from_text(text_municipios[1]);

                    cargar_modelo(puntos, filename);
                };

                reader.readAsText(file);
            }
            else
            {
                $('#modelo-formato-file').val('');
                alert('El archivo exede el tamaño maximo permitido, por favor solo archivos menores 8 Mb.');
            }
        }
        else
        {
            $('#' + div_certificado + '-certificado-votacion-formato-file').val('');
            alert('Formato del archivo incorrecto, solo archivos ' + info);
        }
    }
    else
    {
        $('#modelo-formato-file').val('');
        alert('No se ha seleccionado ningun archivo');
    }
}

function obtener_puntos_from_text(text)
{
    var salida = new Array();
    var datos = text.split('');
    var text_puntos = '';

    for(var i = 0; i < datos.length; i++)
    {
        if(datos[i] != '[' && datos[i] != ']' && datos[i] != ';')
        {
            text_puntos += datos[i];
        }
    }

    var data_puntos = text_puntos.split('|');

    for(var i = 0; i < data_puntos.length; i++)
    {
        if(data_puntos[i] != '')
        {
            var punto = data_puntos[i];
            var data_punto = punto.split(',');

            salida.push([parseFloat(data_punto[0]), parseFloat(data_punto[1])]);
        }
    }

    return salida;
}

function cargar_modelo(puntos, file)
{
    for(var i = 0; i < puntos.length; i++)
    {
        var municipio = lista_municipios[i];
        var este = parseFloat(puntos[i][0]);
        var norte = parseFloat(puntos[i][1]);

        var id_fila = 'fila_' + (i + 1) + '_' + get_date();

        var cell_cantidad = '<td class="text-center">' + (i + 1) + '</td>';
        var cell_municipio  = '<td>' + municipio + '</td>';
        var cell_este  = '<td class="text-center">' + este + '</td>';
        var cell_norte  = '<td class="text-center">' + norte + '</td>';
        var cell_botones = '<td class="text-center">'
                            + '<button class="btn btn-default" title="Eliminar" onclick="eliminar_fila('+ "'" + id_fila + "'" + ')"><span class="fas fa-trash"></span></button>'
                            + '</td>';

        $('#datos-tabla>tbody').append('<tr id="' + id_fila + '">' + cell_cantidad + cell_municipio + cell_este + cell_norte + cell_botones + '</tr>');
    }

    add_text_console('Se cargo el modelo ' + file);

    actualizar_plano('datos-tabla');
}

function add_text_console(text)
{
    document.getElementById('consola').innerHTML += '--> ' + text + '<br>';
}

function crear_file_modelo(id)
{
    var datosTabla = document.querySelectorAll('#' + id + ' tbody tr');

    if(datosTabla.length > 0)
    {
        var puntos = '';

        for(var i = 0;i < datosTabla.length;i++)
        {
            var fila = datosTabla[i];
            var este = parseFloat(fila.children[2].textContent);
            var norte = parseFloat(fila.children[3].textContent);

            puntos += '|' + este + ',' + norte;
        }

        var parametros = 
        {
            size: datosTabla.length,
            puntos: puntos + '|'
        };

        $.ajax(
        {
            type: 'POST',
            url: 'crear_file_modelo',
            data: parametros,
            success: function(respuesta)
            {
                add_text_console('Se creeo el modelo datos_modelo.dzn');
                add_text_console('Ejecutando modelo ...');

                $.ajax(
                {
                    type: 'POST',
                    url: 'ejecutar_modelo',
                    data: parametros,
                    success: function(respuesta)
                    {
                        add_text_console('Result: ' + respuesta);
                    }
                });
            }
        });
    }
    else
    {
        alert('No hay datos para ejecutar el modelo')
    }
}
//////////////////////////////////

function verMenu()
{
    if(document.body.clientWidth <= 1100)
    {
        ocultarMenu();
    }
}

function filtrarTabla(tabla,valor,claseFila)
{
    var contador = 0;
    valor = valor.toLowerCase();
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
                    total--;
                }
                else
                {
                    contador++;
                    fila.style.display = 'table-row';

                    if(claseFila != undefined)
                    {
                        if((contador % 2) == 0)
                        {
                            fila.classList.add(claseFila);
                        }
                    }
                }
            }
        }
        else
        {
            total = datosTabla.length;

            for(var i = 0;i < datosTabla.length;i++)
            {
                contador++;
                var fila = datosTabla[i];

                if(claseFila != undefined)
                {
                    fila.classList.remove(claseFila);

                    if((contador % 2) == 0)
                    {
                        fila.classList.add(claseFila);
                    }
                }

                fila.style.display = 'table-row';
            }
        }
    }
    else
    {
        total = datosTabla.length;

        for(var i = 0;i < datosTabla.length;i++)
        {
            contador++;
            var fila = datosTabla[i];

            if(claseFila != undefined)
            {
                fila.classList.remove(claseFila);

                if((contador % 2) == 0)
                {
                    fila.classList.add(claseFila);
                }
            }

            fila.style.display = 'table-row';
        }
    }

    if(total != datosTabla.length)
    {
        $('#' + tabla + '-total').val(total + ' de ' + datosTabla.length);
    }
    else
    {
        $('#' + tabla + '-total').val(total);
    }
}

function ocultar(id)
{
	if(document.getElementById(id))
	{
		document.getElementById(id).style.display = 'none';
	}
	else
	{
		alert('Error, no existe el elemento ' + id);
	}
}

function mostrar(id)
{
	if(document.getElementById(id))
	{
		document.getElementById(id).style.display = 'block';
	}
	else
	{
		alert('Error, no existe el elemento ' + id);
	}

    if(id == 'contenedor-ventanas')
    {
        ocultar('contenedor-ventanas-2');
    }

    if(id == 'contenedor-ventanas-2')
    {
        ocultar('contenedor-ventanas');
    }
}

function generarClick(id)
{
	if(document.getElementById(id))
	{
		document.getElementById(id).click();
	}
	else
	{
		alert('Error, no existe el elemento ' + id);
	}
}

function enfocar(id)
{
    if(document.getElementById(id))
    {
        document.getElementById(id).focus();
    }
    else
    {
        alert('Error, no existe el elemento ' + id);
    }
}

function mostrarSubventana(titulo,source,parametros,funcion,size)
{
    document.getElementById('contenedor-subventana-titulo').style.background = '#ff0015';
    document.getElementById('subventana-dialog').style = '';

    if(parametros === undefined)
    {
        parametros = {};
    }
    else
    {
        if(parametros['action'] == 'ventanaConfirmacion')
        {
            document.getElementById('contenedor-subventana-titulo').style.background = '#006d32';
        }
    }

    if(size === undefined)
    {
    	document.getElementById('subventana-dialog').classList.remove('subventana-dialog');
    }
    else
    {
    	if(size == true)
    	{
    		document.getElementById('subventana-dialog').classList.add('subventana-dialog');
    	}
    	else
    	{
    		document.getElementById('subventana-dialog').style.width = size;
    	}
    }

    $('#subventana-contenido').load(source,parametros, function()
    {
        if(funcion != undefined)
        {
            funcion();
        }

        document.getElementById('subventana-titulo').innerHTML = titulo;

        if(document.getElementById('subventana').style.display != 'block')
        {
        	generarClick('boton-subventana');
        }
    });
}

function cambiarSubcontenedor(id_contenedor,indice,funcion)
{
	for(var i = 1;document.getElementById(id_contenedor + '-' + i);i++)
	{
		if(i === indice)
		{
			document.getElementById(id_contenedor + '-' + i).style.display = 'block';
		}
		else
		{
			document.getElementById(id_contenedor + '-' + i).style.display = 'none';
		}
	}

    if(funcion != undefined)
    {
        funcion();
    }
}

function soloNumeros(e) 
{
    var key = window.Event ? e.which : e.keyCode;

    var salida = ((key >= 48 && key <= 57) || key === 8  || key === 13 || key === 46);

    return salida; 
}

function verificarEntero(objeto,minimo,maximo)
{
    if(objeto.value != '')
    {
        valor = Math.trunc(objeto.value);

        if(isNaN(valor))
        {
            objeto.value = '';
        }
        else
        {
            if(minimo != undefined)
            {
                if(valor < minimo)
                {
                    objeto.value = minimo;
                }
            }
        	if(maximo != undefined)
        	{
	            if(valor > maximo)
	            {
	                objeto.value = maximo;
	            }
	        }
        }
    }
}

function colocar_punto_decimal(valor)
{
    valor = valor + '';
    var datos = valor.split('');
    var salida = '';
    var contador = 0;
    
    for(var i = datos.length - 1;i >= 0;i--)
    {
        contador++;

        if(contador == 4)
        {
            salida = '.' + salida;
            contador = 1;
        }

        salida = datos[i] + salida;
    }

    return salida;
}

function vaciarHTML(id)
{
	document.getElementById(id).innerHTML = '';
}

function inputAutocomplete(objeto,lista)
{
    if(objeto.dataset.info != '' || objeto.dataset.info == '00')
    {
        for(var i = 0;i < lista.length;i++)
        {
            eval('objeto.dataset.' + lista[i] + " = '';");
        }

        objeto.dataset.info = '';
        objeto.value = '';
    }
}

function generarVariosClicks(id)
{
    for(var i = 1;document.getElementById(id + i);i++)
    {
        if(continuarClicks)
        {
            generarClick(id + i);
        }
    }
}

function printDocument(url,nombre)
{
    nombre = nombre + '.pdf';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e)
    {
        if(this.status == 200)
        {
            var blob = new Blob([this.response], {type:"application/pdf"});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nombre;
            link.click();
        }
    };
    
    xhr.send();
}

function nuevaPestania(url)
{
    window.open(url);
}

function go_down()
{
    var alto = (document.getElementsByTagName('body'))[0].clientHeight;

    window.scrollTo(0,alto);
}

function cero()
{
    mostrarAlerta('MENSAJE DE INFORMACIÓN','Funcionalidad en desarrollo.',2);
}

function get_dia_semana(dia)
{
    dia = parseInt(dia);

	var dias = ['Domingo','Lunes','Martes','Míercoles','Jueves','Viernes','Sabado'];

    return dias[dia];
}

function get_mes(mes)
{
    mes = parseInt(mes);

    var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    return meses[mes];
}

function get_date()
{
    var fecha = new Date();

    return fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
}

