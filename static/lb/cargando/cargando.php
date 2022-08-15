
<?php 

	$texto = $_POST['texto'];
	$admin = $_POST['admin'];

?>

<link rel="stylesheet" type="text/css" href="<?php echo ($admin == '0')?'':'../'; ?>lb/cargando/cargando.css">

<div class="cargando-contenido">
	<div class="cargando-animacion"></div>
	<div class="cargando-texto" id="cargando-texto" ondblclick="cargando_ocultar()"><?php echo $texto; ?></div>
</div>
