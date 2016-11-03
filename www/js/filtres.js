var currentFilterArtisans = '+name';
var currentFilterProgrammes = '+start';
var currentFilterEtablissements = '+name';

/* Fonction		: openFilter
 * Paramètres	: viewName - Le nom de la vue sur laquelle est le bouton
 * Description	: Initialise et ouvre la popup des filtres
 */
function openFilter(viewName){
	if(viewName == "app.artisans"){
		var filtres = [];
		var tris = [];
		var recherche = false;
	}
	if(viewName == "app.programmes"){
		var filtres = [];
		var tris = [];
		var recherche = false;
	}
	if(viewName == "app.etablissements"){
		var filtres = [];
		var tris = [];
		var recherche = false;
	}
	$('#filtres').removeClass('hidden');
}

/* Fonction		: closeFilter
 * Paramètres	: -
 * Description	: Ferme la popup des filtres
 */
function closeFilter(){
	$('#filtres').addClass('hidden');
}

/* Fonction		: getFilter
 * Paramètres	: viewName - 
 * Description	: Donne le filtre en cours
 */
function getFilter(viewName){
	if(viewName == "app.artisans"){
		return currentFilterArtisans;
	}
	if(viewName == "app.programmes"){
		return currentFilterProgrammes;
	}
	if(viewName == "app.etablissements"){
		return currentFilterEtablissements;
	}
};

/* Fonction		: changeFilter
 * Paramètres	: viewName - , Filtre - Le nouveau filtre séléctionné
 * Description	: Change le filtre en cours
 */
function changeFilter(viewName, filter){
	if(viewName == "app.artisans"){
		currentFilterArtisans = filter;
	}
	if(viewName == "app.programmes"){
		currentFilterProgrammes = filter;
	}
	if(viewName == "app.etablissements"){
		currentFilterEtablissements = filter;
	}

	closeFilter();
};