package io.avengers.ws;

import java.util.Set;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import io.avengers.domain.Hero;
import io.avengers.service.HeroService;


@Path("heroes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HeroResource {

	@GET
	public Set<Hero> getAllHeroes() {
		HeroService hservice = new HeroService();
		return hservice.findAll();

	}

	@GET
	@Path("{id}")
	public Hero findHerobyId(@PathParam("id") int id) {
		Hero hero = new HeroService().findHeroesById(id);
		return hero;
	}

	@POST
	public Hero createHero(Hero hero) {
		System.out.println(hero);
		
		if (hero.getName().isEmpty()) {
			return null;
		}
	
		return new HeroService().createHero(hero);
	}

	@DELETE
	@Path("{id}")
	public Response deleteHero(@PathParam("id") int id) {
		Hero hero = new HeroService().findHeroesById(id);
		System.out.println(hero);
		if (hero == null) {
			return Response.status(404).build();
		} else {
			new HeroService().deleteHero(hero);
			return Response.noContent().header("X-message", "Delete" + hero.getName()).build();
		}
	}

	@DELETE
	@Path("{id}/team")
	public Response removeTeamFromHero(@PathParam("id") int id) {
		Hero hero = new HeroService().findHeroesById(id);
		System.out.println(hero);
		if (hero == null) {
			return Response.status(404).build();
		} else {
			new HeroService().removeTeamFromHero(hero);
			return Response.noContent().header("X-message", "Delete" + hero.getTeam()).build();
		}
	}
	
	@PUT
	public Response updateHero(Hero hero) {
		Hero oldHero = new HeroService().findHeroesById(hero.getId());
		String oldName = oldHero.getName(); 
		System.out.println(oldHero);
		if (oldHero == null) {
			return Response.status(404).build();
		} else {
			Hero newHero = new HeroService().changeHeroName(hero.getId(), hero.getName());
			
			return Response.noContent().header("X-message", "Update" + oldName + "in"+ newHero.getName()).build();
		}
	}
}
