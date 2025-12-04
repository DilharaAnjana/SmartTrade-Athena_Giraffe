package lk.jiat.smarttrade.controller.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.annotation.IsUser;
import lk.jiat.smarttrade.dto.UserDTO;
import lk.jiat.smarttrade.entity.User;
import lk.jiat.smarttrade.service.UserService;
import lk.jiat.smarttrade.util.AppUtil;

@Path("/users")
public class UserController {

    @IsUser
    @Path("/logout")
    @GET
    public Response logout(@Context HttpServletRequest request) {

        HttpSession httpSession = request.getSession(false);
        if (httpSession != null && httpSession.getAttribute("user") != null) {
            httpSession.invalidate();
            return Response.status(Response.Status.OK).build();
        } else {
            System.out.println("else");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewAccount(String jsonData) {
        UserDTO userDTO = AppUtil.GSON.fromJson(jsonData, UserDTO.class);
        String responseJson = new UserService().addNewUser(userDTO);
        return Response.ok().entity(responseJson).build();
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response userLogin(String jsonData, @Context HttpServletRequest request) {
        UserDTO userDTO = AppUtil.GSON.fromJson(jsonData, UserDTO.class);
        String responseJson = new UserService().userLogin(userDTO, request);
        return Response.ok().entity(responseJson).build();
    }
}
