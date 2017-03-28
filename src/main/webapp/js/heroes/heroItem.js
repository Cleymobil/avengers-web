import { HeroListComponent } from "./heroListComponent";

export function HeroItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

HeroItem.prototype = {
    render() {

        const template = `<li>${this.name}&nbsp&nbsp<button class="delete">Delete ${this.name}</button>&nbsp&nbsp&nbsp&nbsp<button class="view">View ${this.name}</button></li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        //Catch the button without reading all DOM with find()
        const button = this.$el.find('button.delete').on('click', event => this.remove());
        const button2 = this.$el.find('button.view').on('click', event => this.viewHero());

        return this.$el;
    },
    viewHero: function() {
        return $.get('marvel/heroes/' + this.id)
            .then(Response => {
                $('div.component').remove();
                const template = `<div class="component"><h1>${this.name}</h1> <ul><li>Name:${this.name}</li><li>Id:${this.id}</li><li>Likes:${this.likes}</li></ul><h1></h1></div>`;
                this.$el2 = $(template);
                $('body').append(this.$el2);
                //this.viewHeroes();

            })
    },

    remove() {
        fetch('marvel/heroes/' + this.id, {
                method: 'delete'
            })
            .catch(error => heroApplication());
        //new state
        this.collection = this.collection.filter(h => h.id !== this.id);
        this.$el.remove();
    },
    renderCheck() {
        const template = `<li><input class="checkboxHero" type= "checkbox" name = ${this.id}>${this.name}</li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        return this.$el;
    }
}