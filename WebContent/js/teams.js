

function application() {
	component = new TeamListComponent();

	component.fetchAll().then(function (teams) {
		component.render()
	});

}

function TeamListComponent() {
	$('button.create').on('click', event => this.createTeam());

}

TeamListComponent.prototype = {

	fetchAll: function () {

		return $.get('marvel/teams')

			.then(json => {
				this.collection = [];

				json.forEach(data => {
					const team = new TeamItem(data, this)
					this.collection.push(team)
				})
				return this.collection;
			});


	},

	render: function () {
		const template = '<div class="component"><h1>Team List</h1> <ul></ul></div>';


		this.$el = $(template)




		this.collection.forEach(team => this.$el.find('ul').append(team.render()));

		$('body').append(this.$el)
		return this.$el;


	},

	createTeam() {

		newTeam = {
			name: $('input[name=name]').val(),
			history: $('input[name=history]').val()
		}
		const newTeamItem = new TeamItem(newTeam, this)


		fetch('marvel/teams',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(newTeam)
			})
			.then(json => {
				$('div.component').remove();
				this.fetchAll();
				this.collection.push(newTeamItem);
				this.render();
				//this.collection.push(newTeamItem);
				//this.$el.find('ul').append(newTeamItem.render())
			})


	}


}

function TeamItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;


}

TeamItem.prototype = {

	render: function () {
		const template = `<li>${this.name}<button>Delete ${this.name}</button></li>`;
		this.$el = $(template);

		const button = this.$el.find('button').on('click', event => this.remove());
		return this.$el;


	},

	remove: function () {
		fetch('marvel/teams/' + this.id, { method: 'delete' })
			.catch(error => application());
		//new state
		component.collection = component.collection.filter(team => team.id !== this.id);
		this.$el.remove()

	}


}





/*


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
*/

application();