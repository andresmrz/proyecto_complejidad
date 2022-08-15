
<?php 

	$edad = $_POST['edad'];
	$nombre = $_POST['nombre'];

?>

<link rel="stylesheet" type="text/css" href="../lb/cumpleanios/cumpleanios.css">

<script type="text/javascript" src="../lb/cumpleanios/particles/particles.js"></script>
<script type="text/javascript" src="../lb/cumpleanios/particles/app.js"></script>

<div class="cumpleanios-contenedor" id="cumpleanios-contenedor" onmouseover="cumpleanios_iniciar_animacion_burbujas(15)">
	
	<div class="cumpleanios-nombre" id="cumpleanios-nombre" data-info="0">
		<!--Feliz Cumpleaños-->mensaje mensaje <?php  echo $nombre; ?>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado1" id="cumpleanios-objeto-animado1">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado2" id="cumpleanios-objeto-animado2">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado3" id="cumpleanios-objeto-animado3">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado4" id="cumpleanios-objeto-animado4">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado5" id="cumpleanios-objeto-animado5">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado6" id="cumpleanios-objeto-animado6">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado7" id="cumpleanios-objeto-animado7">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado" id="cumpleanios-objeto-animado8">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado1" id="cumpleanios-objeto-animado9">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado2" id="cumpleanios-objeto-animado10">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado3" id="cumpleanios-objeto-animado11">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado4" id="cumpleanios-objeto-animado12">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado cumpleanios-objeto-animado5" id="cumpleanios-objeto-animado13">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado" id="cumpleanios-objeto-animado14">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado" id="cumpleanios-objeto-animado15">
		<span><?php echo $edad; ?></span>
	</div>

	<div class="cumpleanios-contenedor-objeto-animado" id="cumpleanios-objeto-animado16">
		<span><?php echo $edad; ?></span>
	</div>

	<button class="btn btn-danger hint--top hint--error cumpleanios-boton-salir" data-hint="Cerrar" onclick="ocultar('cumpleanios-contenedor-principal')"><b>X</b></button>
</div>
