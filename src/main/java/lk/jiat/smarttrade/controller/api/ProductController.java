package lk.jiat.smarttrade.controller.api;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.dto.ProductDTO;
import lk.jiat.smarttrade.entity.Product;
import lk.jiat.smarttrade.service.FileUploadService;
import lk.jiat.smarttrade.service.ProductService;
import lk.jiat.smarttrade.util.AppUtil;
import org.glassfish.jersey.media.multipart.ContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Path("/products")
public class ProductController {
    @Path("/single-product")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    // Fetch product id from request
    // .../single-product?productId=1
    public Response loadSingleProduct(@QueryParam("productId") int id) {
        String responseJson = new ProductService().getSingleProduct(id);
        return Response.ok().entity(responseJson).build();
    }


    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadAllUserProducts(@Context HttpServletRequest request) {
        String responseJson = new ProductService().getAllUserProducts(request);
        return Response.ok().entity(responseJson).build();
    }

    @Path("/{productId}/upload-images")
    @PUT
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadProductImages(
            @PathParam("productId") int productId,
            @FormDataParam("images[]") FormDataBodyPart formDataBodyPart,
            @Context ServletContext context) {
        List<FileUploadService.FileItem> fileItems = new ArrayList<>();
        FileUploadService fileUploadService = new FileUploadService(context);
        ProductService productService = new ProductService();
        Product product = productService.getProductById(productId);

        formDataBodyPart.getParent().getBodyParts().forEach(bodyPart -> {
            InputStream inputStream = bodyPart.getEntityAs(InputStream.class);
            ContentDisposition contentDisposition = bodyPart.getContentDisposition();
            System.out.println(contentDisposition.getFileName());
            FileUploadService.FileItem fileItem = fileUploadService.uploadFile("product/" + productId, inputStream, contentDisposition);
            fileItems.add(fileItem);
            product.getImages().add(fileItem.getFullUrl());
        });
        String responseJson = productService.updateProduct(product);
        return Response.ok().entity(responseJson).build();
    }

    @Path("/save-product")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveProduct(@FormDataParam("product") String productJson, @Context HttpServletRequest request) {
        ProductDTO productDTO = AppUtil.GSON.fromJson(productJson, ProductDTO.class);
        String responseJson = new ProductService().addNewProduct(productDTO, request);
        return Response.ok().entity(responseJson).build();
    }


}
