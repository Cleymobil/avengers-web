package io.avengers.ws;

import java.sql.SQLException;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.dao.MovieDao;
import io.avengers.domain.Movie;
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
	public Response createNewMovie(Movie newMovie) throws SQLException {
		System.out.println(newMovie);
		MovieService service = new MovieService();
		if (newMovie.getName().isEmpty()) {
			return Response.status(406).entity("\"empty Movie name\"").build();
		}
		System.out.println("--------");
		service.createMovie(newMovie);
		return Response.status(201).entity("\"" + newMovie.getId() + "\"").build();
	}

}
