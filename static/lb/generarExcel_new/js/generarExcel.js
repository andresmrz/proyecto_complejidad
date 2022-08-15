
/**
*
 * (c) 2018 Mauricio
 * Author: Andrés M. Rodríguez Z.
 *
 * License: no disponible
 */

/**
*
* 
*
 */

//// funcion auxiliar

function nulo(texto)  // funcion que evita errores en la tabla
{
    if(texto === '')
    {
        return ' ';
    }
    else
    {
        return texto;
    }
}

/// funcion que permite obtener un archivo xslx (EXCEL) a partir de una tabla en html

/**
** tablaToExcel(tabla,descripcion,hoja,titulo,nombre,autor,ruta)

* tabla: id de la tabla en html
* descripcion: descripcion del contenido de la tabla
* hoja: nombre que tendra hoja/sheet en el archivo xslx (EXCEL)
* titulo: titulo que tendra la tabla, en caso de ser necesario
* nombre: nombre del archivo
* autor: quien genera el archivo (esta informacion se utiliza para llenar el campo autor del archivo)
* ruta: ubicacion del archivo generarExcel.php
* 
*/

function tablaToExcel(tabla,descripcion,hoja,titulo,nombre,autor,ruta)
{
    var datosTituloTabla = document.querySelectorAll('#' + tabla + ' thead tr');
    var datosTabla = document.querySelectorAll('#' + tabla + ' tbody tr');
    var tituloTabla = '';
    var contenido = '';
    var cantidadColumnas = 0;

    if(datosTabla.length > 0)
    {
        var coma = false;

        for(var i = 0;i < datosTituloTabla.length;i++)
        {
            var fila = datosTituloTabla[i];

            cantidadColumnas = (cantidadColumnas < fila.children.length)?fila.children.length:cantidadColumnas;

            for(var j = 0;j < fila.children.length;j++)
            {
                if(tituloTabla === '' || coma)
                {
                    tituloTabla += (fila.children[j].textContent).trim() + '**' + fila.children[j].rowSpan + '-' + fila.children[j].colSpan;
                    coma = false;
                }
                else
                {
                    tituloTabla += '++' + (fila.children[j].textContent).trim() + '**' + fila.children[j].rowSpan + '-' + fila.children[j].colSpan;
                }
            }

            if(i < (datosTituloTabla.length - 1))
            {
                tituloTabla += ';;';
                coma = true;
            }
        }

        coma = false;

        for(var i = 0;i < datosTabla.length;i++)
        {
            var fila = datosTabla[i];

            for(var j = 0;j < fila.children.length;j++)
            {
                if(contenido === '' || coma)
                {
                    contenido += nulo((fila.children[j].textContent).trim()) + '**' + fila.children[j].colSpan;
                    coma = false;
                }
                else
                {
                    contenido += '++' + (fila.children[j].textContent).trim() + '**' + fila.children[j].colSpan;
                }
            }

            if(i < (datosTabla.length - 1))
            {
                contenido += ';;';
                coma = true;
            }
        }

        var html = '<form action="" method="post" id="formulario-generar-excel" style="display: none;z-index: -99;">'
                    + '<input type="text" hidden name="formulario-generar-excel-descripcion" id="formulario-generar-excel-descripcion">'
                    + '<input type="text" hidden name="formulario-generar-excel-hoja" id="formulario-generar-excel-hoja">'
                    + '<input type="text" hidden name="formulario-generar-excel-titulo" id="formulario-generar-excel-titulo">'
                    + '<input type="text" hidden name="formulario-generar-excel-tituloTabla" id="formulario-generar-excel-tituloTabla">'
                    + '<input type="text" hidden name="formulario-generar-excel-contenido" id="formulario-generar-excel-contenido">'
                    + '<input type="text" hidden name="formulario-generar-excel-nombre" id="formulario-generar-excel-nombre">'
                    + '<input type="text" hidden name="formulario-generar-excel-autor" id="formulario-generar-excel-autor" value="">'
                + '</form>';

        if(!document.getElementById('contenedor-formulario-generar-excel'))
        {
            var div = document.createElement("div");
            div.id = 'contenedor-formulario-generar-excel';
            div.innerHTML = html;

            document.body.appendChild(div);
        }
        else
        {
            document.getElementById('contenedor-formulario-generar-excel').innerHTML = html;
        }

        document.getElementById('formulario-generar-excel').action = ruta; /// edita la ruta varia segun arquitectura de la aplicacion
        document.getElementById('formulario-generar-excel-descripcion').value = descripcion;
        document.getElementById('formulario-generar-excel-hoja').value = hoja;
        document.getElementById('formulario-generar-excel-titulo').value = titulo + '**' + cantidadColumnas;
        document.getElementById('formulario-generar-excel-tituloTabla').value = tituloTabla;
        document.getElementById('formulario-generar-excel-contenido').value = contenido;
        document.getElementById('formulario-generar-excel-nombre').value = nombre;
        document.getElementById('formulario-generar-excel-autor').value = autor;

        document.getElementById('formulario-generar-excel').submit();
        document.getElementById('formulario-generar-excel').action = '';
    }
    else
    {
        mostrarAlerta('MENSAJE DE ERROR','No hay datos para exportar.',2);
    }
}

function tablaToExcel_partes(tabla,descripcion,hoja,titulo,nombre,autor,ruta,inicio,fin)
{
    var datosTituloTabla = document.querySelectorAll('#' + tabla + ' thead tr');
    var datosTabla = document.querySelectorAll('#' + tabla + ' tbody tr');
    var tituloTabla = '';
    var contenido = '';
    var cantidadColumnas = 0;

    if(datosTabla.length > 0)
    {
        var coma = false;

        for(var i = 0;i < datosTituloTabla.length;i++)
        {
            var fila = datosTituloTabla[i];

            cantidadColumnas = (cantidadColumnas < fila.children.length)?fila.children.length:cantidadColumnas;

            for(var j = 0;j < fila.children.length;j++)
            {
                if(tituloTabla === '' || coma)
                {
                    tituloTabla += (fila.children[j].textContent).trim() + '**' + fila.children[j].rowSpan + '-' + fila.children[j].colSpan;
                    coma = false;
                }
                else
                {
                    tituloTabla += '++' + (fila.children[j].textContent).trim() + '**' + fila.children[j].rowSpan + '-' + fila.children[j].colSpan;
                }
            }

            if(i < (datosTituloTabla.length - 1))
            {
                tituloTabla += ';;';
                coma = true;
            }
        }

        coma = false;

        for(var i = inicio;i < datosTabla.length && i <= fin;i++)
        {
            var fila = datosTabla[i];

            for(var j = 0;j < fila.children.length;j++)
            {
                if(contenido === '' || coma)
                {
                    contenido += nulo((fila.children[j].textContent).trim()) + '**' + fila.children[j].colSpan;
                    coma = false;
                }
                else
                {
                    contenido += '++' + (fila.children[j].textContent).trim() + '**' + fila.children[j].colSpan;
                }
            }

            if(i < (datosTabla.length - 1))
            {
                contenido += ';;';
                coma = true;
            }
        }

        var html = '<form action="" method="post" id="formulario-generar-excel" style="display: none;z-index: -99;">'
                    + '<input type="text" hidden name="formulario-generar-excel-descripcion" id="formulario-generar-excel-descripcion">'
                    + '<input type="text" hidden name="formulario-generar-excel-hoja" id="formulario-generar-excel-hoja">'
                    + '<input type="text" hidden name="formulario-generar-excel-titulo" id="formulario-generar-excel-titulo">'
                    + '<input type="text" hidden name="formulario-generar-excel-tituloTabla" id="formulario-generar-excel-tituloTabla">'
                    + '<input type="text" hidden name="formulario-generar-excel-contenido" id="formulario-generar-excel-contenido">'
                    + '<input type="text" hidden name="formulario-generar-excel-nombre" id="formulario-generar-excel-nombre">'
                    + '<input type="text" hidden name="formulario-generar-excel-autor" id="formulario-generar-excel-autor" value="">'
                + '</form>';

        if(!document.getElementById('contenedor-formulario-generar-excel'))
        {
            var div = document.createElement("div");
            div.id = 'contenedor-formulario-generar-excel';
            div.innerHTML = html;

            document.body.appendChild(div);
        }
        else
        {
            document.getElementById('contenedor-formulario-generar-excel').innerHTML = html;
        }

        document.getElementById('formulario-generar-excel').action = ruta; /// edita la ruta varia segun arquitectura de la aplicacion
        document.getElementById('formulario-generar-excel-descripcion').value = descripcion;
        document.getElementById('formulario-generar-excel-hoja').value = hoja;
        document.getElementById('formulario-generar-excel-titulo').value = titulo + '**' + cantidadColumnas;
        document.getElementById('formulario-generar-excel-tituloTabla').value = tituloTabla;
        document.getElementById('formulario-generar-excel-contenido').value = contenido;
        document.getElementById('formulario-generar-excel-nombre').value = nombre;
        document.getElementById('formulario-generar-excel-autor').value = autor;

        document.getElementById('formulario-generar-excel').submit();
        document.getElementById('formulario-generar-excel').action = '';
    }
    else
    {
        mostrarAlerta('MENSAJE DE ERROR','No hay datos para exportar.',2);
    }
}

