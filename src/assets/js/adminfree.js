//funcion que permite opacar 50% un componente 
function opacarComponent(idCampo) {
    var element = document.getElementById(idCampo);
	//para IE
	element.style.filter='alpha(opacity=50)';
	//para chrome, firefox
	element.style.opacity='0.5';
}

//funcion que permite dar brillo a un componente
function brilloComponent(idCampo) {
    var element = document.getElementById(idCampo);
	//para IE
	element.style.filter='alpha(opacity=100)';
	//para chrome, firefox
    element.style.opacity='1';
}