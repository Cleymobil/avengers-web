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

import io.avengers.domain.Team;
import io.avengers.service.TeamService;

@Path("teams")
@Produces(MediaType.APPLICATION_JSON)
public class TeamResource {

	@GET
	public Set<Team> getAllTeams() {
		TeamService tservice = new TeamService();
		return tservice.findAll();

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Team findTeamById(@PathParam("id") int id) {
		TeamService tservice = new TeamService();
		return tservice.findTeamById(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createTeam(Team team) {
		TeamService TS = new TeamService();
		if (team.getName().isEmpty()) {
			return Response.status(406).entity("\"empty name\"").build();
		}
		for (Team t : TS.findAll()) {
			if (t.getName().equals(team.getName())) {
				return Response.status(400).entity("\"Team already existing\"").build();
			}

		}

		TS.createTeam(team.getName(), team.getHistory());

		return Response.status(201).entity("\"" + TS.findAll() + "\"").build();
	}

}
