%------------------------------Proyecto--------------------------------------------
include "globals.mzn"; 
%include "datos_modelo.dzn";

%------------------------------Parametros------------------------------------------
%----------------------------------------------------------------------------------
int: n; 
int: m;

set of int: rangoArea= 0..n*100;
set of int: rangoCiudades= 1..m;
set of float: rangoDistancias= 0.0..100*n*2;

array[rangoCiudades,1..2] of int: ciudades;

array[rangoCiudades, 1..2] of int: ciudadesEscaladas = array2d(rangoCiudades,1..2,[ciudades[i,j]*100 | i in rangoCiudades, j in 1..2]);

%------------------------------Funciones------------------------------------------
%---------------------------Funciones Manhtann------------------------------------
function var float: euclidiana(var int: x) = sqrt(((ciudadesEscaladas[x,1]-universidad[1])*(ciudadesEscaladas[x,1]-universidad[1])) + ((ciudadesEscaladas[x,2]-universidad[2])*(ciudadesEscaladas[x,2]-universidad[2])));

function var float: manhattan(var int: x) = abs(ciudadesEscaladas[x,1]-universidad[1]) + abs(ciudadesEscaladas[x,2]-universidad[2]);

%------------------------------Variables-------------------------------------------
%----------------------------------------------------------------------------------
array[1..2] of var rangoArea: universidad;

array [rangoCiudades] of var rangoDistancias: distancias = [manhattan(i) | i in rangoCiudades];

var float: lejana = max(distancias);

%------------------------------Funcion objetivo------------------------------------
%----------------------------------------------------------------------------------
solve minimize lejana;

%------------------------------Output----------------------------------------------
%----------------------------------------------------------------------------------
output["ciudades=\(ciudades);universidad=[\(universidad[1] / 100), \(universidad[2] / 100)];distancias=["]++
%[show_float(0,2,distancias[i]/100) ++ if i=m then "" else ", " endif | i in rangoCiudades]++
["];Ciudad mas lejana=", show_float(0,2,lejana/100)];