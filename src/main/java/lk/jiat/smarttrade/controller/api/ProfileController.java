package lk.jiat.smarttrade.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.annotation.IsUser;
import lk.jiat.smarttrade.dto.UserDTO;
import lk.jiat.smarttrade.service.ProfileService;
import lk.jiat.smarttrade.util.AppUtil;

@Path("/profiles")
public class ProfileController {
    @IsUser
    @Path("/addresses")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadAddresses(@Context HttpServletRequest request) {
        String responseJson = new ProfileService().loadUserAddresses(request);
        return Response.ok().entity(responseJson).build();
    }

    @IsUser
    @Path("/update-profile")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUserProfile(String jsonData, @Context HttpServletRequest request) {
        UserDTO userDTO = AppUtil.GSON.fromJson(jsonData, UserDTO.class);
        String responseJson = new ProfileService().updateProfile(userDTO, request);
        return Response.ok().entity(responseJson).build();
    }

    @IsUser
    @Path("/user-profile")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadUserProfile(@Context HttpServletRequest request) {
        String responseJson = new ProfileService().userProfile(request);
        return Response.ok().entity(responseJson).build();
    }
}
