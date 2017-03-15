package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.domain.Hero;
import io.avengers.domain.Sex;
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
	public Response createHero(Hero hero) {
		System.out.println(hero);
		HeroService heroService = new HeroService();
		if (hero.getName().isEmpty()) {
			return Response.status(406).entity("\"Empty comment\"").build();
		}
		heroService.createHero(hero.getName(), hero.getLikes(), hero.getDislikes(), hero.getAbilities(),
				hero.getHistory());
		return Response.status(201).entity("\"" + heroService.findAll() + "\"").build();

	}

}
