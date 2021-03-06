package io.avengers.ws;

import java.sql.SQLException;
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

import io.avengers.dao.HeroDao;
import io.avengers.dao.MovieDao;
import io.avengers.domain.Movie;
import io.avengers.service.HeroService;
import io.avengers.service.MovieService;

@Path("movies")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class MovieResource {
	@GET
	public Set<Movie> getAllMovies() {
		MovieService mService = new MovieService();
		return mService.findAll();

	}

	@Path("{term}")
	@GET
	public Set<Movie> getMoviesByName(@PathParam("term") String term) {
		MovieService mService = new MovieService();
		return mService.findMoviesByName(term);

	}

	@POST
	public Movie createNewMovie(Movie newMovie) throws SQLException {
		System.out.println(newMovie);
		MovieService service = new MovieService();
		if (newMovie.getName().isEmpty()) {
			return null;
		}
		System.out.println("--------");
		if (newMovie.getHistory()== null){
		service.createMovie(newMovie);
		}else {
			service.createFullMovie(newMovie);
		}
		return newMovie;
	}
	
	@PUT
	public Response addHeroToMovie(@PathParam("movieName") String movieName, @PathParam("heroId") int heroId) {
		System.out.println("movie name is: " + movieName + " and hero id is: " + heroId);
		HeroService heroService = new HeroService();
		MovieService movieService = new MovieService();
		if (movieName.isEmpty() || heroId <= 0) {
			return Response.status(406).entity("\"empty id\"").build();
		}
		String heroName = heroService.findHeroesById(heroId).getName();
		int movieId = movieService.findMoviesByName(movieName).iterator().next().getId();
		
		movieService.putHeroInMovie(heroId, movieId);
		return Response.status(201).entity("\"" + heroName + " " + movieName + "\"").build();
	}
	
	@Path("{movieId}")
	@DELETE
	public Response deleteMovie(@PathParam("movieId") int movieId) {
		MovieService movieService = new MovieService();
		String movieName = movieService.findMovieById(movieId).getName();

		System.out.println("Deleting " + movieName + " whom id is: " + movieId);

		if (movieId <= 0) {
			return Response.status(406).entity("\"empty id\"").build();
		}

		movieService.deleteMovie(movieId);
		return Response.status(204).header("X-deleted","\"" + movieName + " has been deleted" + "\"" ).build();
	}
	
	@Path("{movieId}/{heroId}")
	@DELETE
	public Response deleteMovie(@PathParam("movieId") int movieId, @PathParam("heroId") int heroId) {
		MovieService movieService = new MovieService();
		HeroService heroService = new HeroService();
		String movieName = movieService.findMovieById(movieId).getName();
		String heroName = heroService.findHeroesById(heroId).getName();
		
		System.out.println("Deleting " + heroName + " in: " + movieName);

		if (movieId <= 0 || heroId <= 0) {
			return Response.status(406).entity("\"empty id\"").build();
		}

		movieService.deleteHeroInMovie(movieId, heroId);
		return Response.status(204).header("X-deleted","\"" + heroName + " has been deleted from " +movieName+ "\"").build();
	}
	
	
	

}
