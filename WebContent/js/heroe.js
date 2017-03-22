import { HeroListComponent } from "./heroes/heroListComponent";


let component;

function heroApplication() {
    // now jQuery is ready
    component = new HeroListComponent();
    component.fetchAll().then(function(heroes) {
        component.render(heroes);
    });
}
// after 25ms
$(document).ready(function() {
    heroApplication();
});