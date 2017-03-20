function HeroListComponent() {
    $('button.create').on('click', event => this.createHero());
}
HeroListComponent.prototype = {
    fetchAll: function() {
        return $.get('marvel/heroes')
            .then(json => {
                this.collection = [];
                json.forEach(data => {
                    const hero = new HeroItem(data, this);
                    this.collection.push(hero);
                });
                return this.collection;
            });
    },
    render: function() {
        const template = `<div class = component>
			<h1>Hero List</h1> 
				<ul>
				</ul>
				<footer> Some html footer</footer>
			</div>`;
        //cached component jQueryified element
        this.$el = $(template);
        console.log(this.$el);
        //All is done in Memory
        this.collection.forEach(hero => this.$el.find('ul').append(hero.render()));
        //More efficient, if we put in the DOM later
        $('div.heroList').append(this.$el);
        return this.$el;
    },
    createHero() {

        const hero = {
            name: $('input[name=name]').val(),
            likes: parseInt($('input[name=likes]').val()),
            dislikes: parseInt($('input[name=dislikes]').val()),
            team: $('input[name=team]').val()
        }

        console.log(hero);
        fetch('marvel/heroes/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(hero)
        })

    }
}


function HeroItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

HeroItem.prototype = {
    render() {

        const template = `<li>${this.name}<button>Delete ${this.name}</button></li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        //Catch the button without reading all DOM with find()
        const button = this.$el.find('button').on('click', event => this.remove());
        return this.$el;
    },

    remove() {
        fetch('marvel/heroes/' + this.id, { method: 'delete' })
            .catch(error => heroApplication());
        //new state
        component.collection = component.collection.filter(h => h.id !== this.id);
        this.$el.remove();
    }
}