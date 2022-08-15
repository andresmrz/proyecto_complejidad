
function cumpleanios_verificar_fecha(fecha,nombre)
{
	var fecha_cumpleanios = new Date(fecha + ' 00:00:00');
	var hoy = new Date();

	if(fecha_cumpleanios.getMonth() == hoy.getMonth() && fecha_cumpleanios.getDate() == hoy.getDate())
	{
		cumpleanios_done(cumpleanios_calcular_edad(fecha),nombre);
	}
}

function cumpleanios_calcular_edad(fecha)
{
	var fecha_cumpleanios = new Date(fecha + ' 00:00:00');
	var hoy = new Date();
	var edad = hoy.getFullYear() - fecha_cumpleanios.getFullYear();

	if(fecha_cumpleanios.getMonth() > hoy.getMonth())
	{
		edad--;
	}
	else if(fecha_cumpleanios.getMonth() == hoy.getMonth())
	{
		if(fecha_cumpleanios.getDate() > hoy.getDate())
		{
			edad--;
		}
	}

	return edad;
}

function cumpleanios_done(edad,nombre)
{
	if(!document.getElementById('cumpleanios-contenedor-principal'))
	{
		var div = document.createElement("div");
	    div.id = 'cumpleanios-contenedor-principal';

	    document.body.appendChild(div);
	}

    $('#cumpleanios-contenedor-principal').load('../lb/cumpleanios/cumpleanios.php',{edad:edad, nombre:nombre},function()
    {
        for(var i = 1;document.getElementById('cumpleanios-objeto-animado' + i);i++)
        {
        	cumpleanios_animar('cumpleanios-objeto-animado' + i);
        	mostrar('cumpleanios-contenedor-principal');
        }
    });
}

function cumpleanios_calcular_posicion()
{  
    var h = document.getElementById('cumpleanios-contenedor').clientHeight - 150;
    var w = document.getElementById('cumpleanios-contenedor').clientWidth - 150;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];       
}

function cumpleanios_iniciar_animacion_burbujas(cantidad)
{
	if(parseInt(document.getElementById('cumpleanios-nombre').dataset.info) == 0)
	{
		document.getElementById('cumpleanios-nombre').dataset.info = '1';

		for(var i = 0;i < cantidad;i++)
		{
			cumpleanios_animar_burbujas();
		}
	}
}

function cumpleanios_animar(id)
{
    var newq = cumpleanios_calcular_posicion();
    var oldq = $('#' + id).offset();
    var speed = cumpleanios_calcular_speed([oldq.top, oldq.left], newq);
    
    $('#' + id).animate({top: newq[0], left: newq[1]}, speed, function()
    {
    	cumpleanios_animar(id);        
    });   
}

function cumpleanios_calcular_speed(prev, next)
{
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;
}

function cumpleanios_animar_burbujas()
{
 
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [4,6,8,10];
 
    // Push the header width values to bArray
    for (var i = 0; i < document.getElementById('cumpleanios-nombre').clientWidth; i++) {
        bArray.push(i);
    }
     
    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){
         
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.cumpleanios-nombre').append('<div class="cumpleanios-nombre-burbujas" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.cumpleanios-nombre-burbujas').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );
 
 
    }, 350);
}

