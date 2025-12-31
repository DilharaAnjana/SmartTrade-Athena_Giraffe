package lk.jiat.smarttrade.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.annotation.IsUser;
import lk.jiat.smarttrade.service.CheckoutService;

@Path("/checkouts")
public class CheckoutController {
    private final CheckoutService checkoutService = new CheckoutService();

    @IsUser
    @Path("/user-checkout-data")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadUserCheckoutData(@Context HttpServletRequest request) {
        String responseJson = checkoutService.getCheckoutData(request);
        return Response.ok().entity(responseJson).build();
    }
}
