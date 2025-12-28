package lk.jiat.smarttrade.controller.api;

import com.google.gson.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.service.AdvancedSearchService;
import lk.jiat.smarttrade.util.AppUtil;

@Path("/advanced-search")
public class AdvancedSearchController {
    private final AdvancedSearchService advancedSearchService = new AdvancedSearchService();

    @Path("/search-data")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadAdvancedSearchData(String requestJson) {
        JsonObject requestObject = AppUtil.GSON.fromJson(requestJson, JsonObject.class);
        String responseJson = advancedSearchService.getAdvancedSearchData(requestObject);
        return Response.ok().entity(responseJson).build();
    }

    @Path("/all-data")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadAdvancedSearchData() {
        String responseJson = advancedSearchService.getAllProductData();
        return Response.ok().entity(responseJson).build();
    }
}
