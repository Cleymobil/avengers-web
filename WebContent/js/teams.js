import { TeamListComponent } from "./teams/teamListComponent";
import { HeroListComponent } from "./heroes/heroListComponent";

let component;

function application() {
    component = new TeamListComponent();

    component.fetchAll().then(function(teams) {
        component.render();
        component.renderList();
    })
    let heroListComponent = new HeroListComponent();
    heroListComponent.fetchAll().then(function(heroes) {
        heroListComponent.renderCheckedList(heroes);
    });
}

application();