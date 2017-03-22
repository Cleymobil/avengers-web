import { TeamListComponent } from "./teams/teamListComponent";
import { HeroListComponent } from "./heroes/heroListComponent";

let component;

function application() {
    component = new TeamListComponent();

	component.fetchAll().then(function (teams) {
		component.render();
		component.renderList();
	})
	heroListComponent = new HeroListComponent();
	heroListComponent.fetchAll().then(function (heroes) {
		heroListComponent.renderCheckedList(heroes);
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
			.then(Response => {
				$('div.component').remove();
				return this.fetchAll()
			})
			.then(Response => {
				this.render();
			})


	},
	renderList: function () {
		const template = `<select name="teamSelectName" id="teamSelect">

       </select>`;
		//cached component jQueryified element
		this.$el = $(template);
		console.log(this.$el);
		//All is done in Memory
		this.collection.forEach(team => {this.$el.find('#teamSelect').append(team.renderInList())
		this.$el.find('#teamSelect').append(team.name);
	
});
		//More efficient, if we put in the DOM later
		$('#teamSelectId').append(this.$el);
		return this.$el;
	}


}

function TeamItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;


}

TeamItem.prototype = {

	render: function () {
		const template = `<li>${this.name}<button class="delete">Delete ${this.name}</button><button class="view">View ${this.name}</button></li></ul></div>`;
		this.$el = $(template);

		const button = this.$el.find('button.delete').on('click', event => this.remove());
		const button2 = this.$el.find('button.view').on('click', event => this.viewTeam());
		return this.$el;


	},

	renderInList: function () {
		
		const template = `<option value="${this.name}">${this.name}</option>`;
		//Element jQueryfied
		this.$el = $(template);
		return this.$el;
	},

	remove: function () {
		console.log("removing " + this.name + " " + "id: " + this.id)
		fetch('marvel/teams/' + this.id, { method: 'delete' })
			.catch(error => application());
		//new state
		this.collection = this.collection.filter(team => team.id !== this.id);
		this.$el.remove();
		this.listComponent.render();

	},


	viewTeam: function () {
		return $.get('marvel/teams/' + this.id)

			.then(Response => {
				$('div.component').remove();
				const template = `<div class="component"><h1>${this.name}</h1> <ul><li>Name:${this.name}</li><li>Id:${this.id}</li><li>History:${this.history}</li></ul><h1><button class="viewTeams">View teams</button></h1></div>`;
				this.$el = $(template);
				const button3 = this.$el.find('button.viewTeams').on('click', event => this.home());
				$('body').append(this.$el);
				this.viewHeroes();

			})
	},


	fetchHeroes: function () {


		return $.get('marvel/teams/' + this.id + '/heroes')

			.then(json => {
				this.heroes = [];

				json.forEach(data => {

					this.heroes.push(data)

				})
				console.log(this.heroes);
				return this.heroes;
			});


	},


	viewHeroes: function () {

		const template = '<li>Team heroes<ul></ul></li>';
		this.$el = $(template);

		return this.fetchHeroes()
			.then(heroes => {
				if (heroes.length !== 0) {
					heroes.forEach(hero => {
						console.log("heroName " + hero.name);
						this.$el.find('ul').append('<li>' + hero.name + '</li>')
					});
				} else { this.$el.find('ul').append("<li>There are no heroes in the team</li>") };
				$('body div.component ul').append(this.$el)
				return this.$el;

			});
	},

	home: function () {

		$('div.component').remove();

		this.listComponent.render();
	}

}

application();