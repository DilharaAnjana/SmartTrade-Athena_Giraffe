package lk.jiat.smarttrade.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.annotation.IsUser;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Path("/test")
public class TestController {
    @IsUser
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response test() {
        try {
            return Response.ok().entity(new String(Files.readAllBytes(Paths.get("src/main/webapp/sign-in.html")))).build();
        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();

        }
    }
}
