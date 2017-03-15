let globalHeroes =[];

function application() {
	
	fetchHeroes().then(function (heroes) {
		console.log('found heroes', heroes);
		// changed the state
		globalHeroes = heroes;

		displayHeroes(heroes);
	});
}

function fetchHeroes() {
	console.log('fetching heroes');
	return fetch('marvel/heroes').then(response => response.json());
}

function displayHeroes(heroes) {
	const ul = document.createElement('ul');
	document.body.appendChild(ul);
	heroes.forEach(heroe => displayHeroe(heroe));
	
}

function displayHeroe(heroe) {
	console.log('heroe', heroe.name);
	//search ul
	const ul = document.querySelector('ul');
	//Create <li></li>
	const li = document.createElement('li');
	const text = document.createTextNode(heroe.name);
	li.appendChild(text);
	ul.appendChild(li);

	//ADD button
	const button = document.createElement('button');
	button.appendChild(document.createTextNode('DELETE ' + heroe.name));
	li.appendChild(button);
	button.addEventListener('click', function (event) {
		console.log('event', event);
		deleteHero(heroe.id);
	});
}

function deleteHero(id) {
	fetch('marvel/heroes/' + id, { method: 'delete' }).catch(error => application);
	//new state
	globalHeroes = globalHeroes.filter(heroe => heroe.id !== id);

	//remove <UL/>
	document.body.removeChild(document.querySelector('ul'));
	//replay
	displayHeroes(globalHeroes);
}

function createHero(hero){
	//document.querySelector("input[name=likes]").value 
	//document.querySelector("input[name=dislikes]").value 
	//document.querySelector("input[name=name]").value 
	//document.querySelector("input[name=team]").value 
}


//GO!
application();


