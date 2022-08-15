<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=1.0, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0">
	<title>TableToExcel</title>
	<link rel="icon" href="../img/favicon.png">
	<meta name="author" content="Mao">

	<!-- scripts online -->

	

    <!-- scripts locales -->

	<link rel="stylesheet" type="text/css" href="../css/generarExcel.css">
	<script type="text/javascript" src="../js/generarExcel.js"></script>

</head>
<body style="background: url('../img/fondo.png');">
		
	<table class="tabla" id="tabla">
		<thead>
			<tr>
				<th colspan="4">
					<center>
						<b>GOLEADOR MUNDIAL RUSIA 2018</b>
					</center>
				</th>
			</tr>

			<tr>
				<th>
					<center>
						<b>POSICIÓN</b>
					</center>
				</th>

				<th>
					<center>
						<b>JUGADOR</b>
					</center>
				</th>

				<th>
					<center>
						<b>PAIS</b>
					</center>
				</th>

				<th>
					<center>
						<b>GOLES</b>
					</center>
				</th>
			</tr>
		</thead>

		<tbody>
			<tr>
				<td>
					<center>
						<b>1°</b>
					</center>
				</td>

				<td>
					<b>Harry Kane</b>
				</td>

				<td>Inglaterra</td>

				<td>
					<center>6</center>
				</td>
			</tr>

			<tr>
				<td>
					<center>
						<b>2°</b>
					</center>
				</td>

				<td>
					<b>Antoine Griezman</b>
				</td>

				<td>Francia</td>

				<td>
					<center>4</center>
				</td>
			</tr>

			<tr>
				<td>
					<center>
						<b>2°</b>
					</center>
				</td>

				<td>
					<b>Cristiano Ronaldo</b>
				</td>

				<td>Portugal</td>

				<td>
					<center>4</center>
				</td>
			</tr>

			<tr>
				<td>
					<center>
						<b>2°</b>
					</center>
				</td>

				<td>
					<b>Denís Chéryshev</b>
				</td>

				<td>Rusia</td>

				<td>
					<center>4</center>
				</td>
			</tr>

			<tr>
				<td>
					<center>
						<b>2°</b>
					</center>
				</td>

				<td>
					<b>Kylian Mbappé</b>
				</td>

				<td>Francia</td>

				<td>
					<center>4</center>
				</td>
			</tr>

			<tr>
				<td>
					<center>
						<b>2°</b>
					</center>
				</td>

				<td>
					<b>Romelu Lukaku</b>
				</td>

				<td>Bélgica</td>

				<td>
					<center>4</center>
				</td>
			</tr>

			<tr>
				<td colspan="3">
					<center>
						TOTAL
					</center>
				</td>
				<td class="text-center">26</td>
			</tr>
		</tbody>
	</table>

	<center>
		<br><br><br>

		<!-- funcion que permite obtener un archivo xslx (EXCEL) a partir de una tabla en html

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
		*/-->

		<button title="Descargar Excel" class="boton-descargar" onclick="tablaToExcel('tabla','Tabla de goleadores mundial Rusia 2018','Goleadores','TABLA DE GOLEADORES','estadisticasRusia2018','Mi Nombre','../php/generarExcel.php');"><img src="../img/excel.png"></button>
	</center>

</body>
</html>