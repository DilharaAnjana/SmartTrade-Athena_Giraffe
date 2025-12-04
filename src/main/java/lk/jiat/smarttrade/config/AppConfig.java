package lk.jiat.smarttrade.config;

import org.glassfish.jersey.server.ResourceConfig;

public class AppConfig extends ResourceConfig {
    public AppConfig(){
        packages("lk.jiat.smarttrade.controller");
        packages("lk.jiat.smarttrade.middleware");
        register(org.glassfish.jersey.media.multipart.MultiPartFeature.class);
    }
}
