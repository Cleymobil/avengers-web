 import { TeamItem } from "./teamComponent";

 export function TeamListComponent() {
     $('button.create').on('click', event => this.createTeam());

 }

 TeamListComponent.prototype = {

     fetchAll: function() {

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

     render: function() {
         const template = '<div class="component"><h1>Team List</h1> <ul></ul></div>';
         this.$el = $(template)
         this.collection.forEach(team => this.$el.find('ul').append(team.render()));

         $('body').append(this.$el)
         return this.$el;
     },

     createTeam() {

         let newTeam = {
             name: $('input[name=name]').val(),
             history: $('input[name=history]').val()
         }
         const newTeamItem = new TeamItem(newTeam, this)


         fetch('marvel/teams', {
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
     renderList: function() {
         const template = `<select name="teamSelectName" class="teamSelect">

       </select>`;
         //cached component jQueryified element
         this.$el = $(template);
         console.log(this.$el);
         //All is done in Memory
         this.collection.forEach(team => this.$el.find('.teamSelect').append(team.renderInList()));
         //More efficient, if we put in the DOM later
         $('#teamSelectId').append(this.$el);
         return this.$el;
     }
 }