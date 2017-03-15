
let globalTeams = [];

function application() {

	fetchTeams().then(function (teams) {
		console.log('found teams', teams)

		globalTeams = teams;
		displayTeams(teams)
	});

}





function fetchTeams() {
	console.log('fetching teams');
	return fetch('marvel/teams').then(resp => resp.json());
}

function displayTeams(teams) {
	const ul = document.createElement("ul");
	document.body.appendChild(ul);

	teams.forEach(team => displayTeam(team));
}

function displayTeam(team) {
	console.log('team', team.name);

	// CREATE <li></li>
	const ul = document.querySelector('ul');
	const li = document.createElement("li");
	const text = document.createTextNode(team.name);
	li.appendChild(text);
	ul.appendChild(li);

	//ADD Button
	const button = document.createElement("button");
	button.appendChild(document.createTextNode('Delete ' + team.name));
	li.appendChild(button);

	//button.addEventListener('click', function (event) {
		//removeUser(user.id);

//	});


}


application();