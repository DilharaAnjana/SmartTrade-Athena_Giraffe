package lk.jiat.smarttrade;

import lk.jiat.smarttrade.config.AppConfig;
import lk.jiat.smarttrade.listener.ContextPathListener;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;
import org.glassfish.jersey.servlet.ServletContainer;

import java.io.File;
import java.net.URISyntaxException;

public class Main {

    private static final int SERVER_PORT = 8080;
    private static final String CONTEXT_PATH = "/neongear";

    public static void main(String[] args) {
        try {
            Tomcat tomcat = new Tomcat();
            tomcat.setPort(SERVER_PORT);
            tomcat.getConnector();

            String webappPath = resolveWebappPath();
            Context context = tomcat.addWebapp(CONTEXT_PATH, webappPath);
            Tomcat.addServlet(context, "JerseyServlet", new ServletContainer(new AppConfig()));
            context.addServletMappingDecoded("/api/*", "JerseyServlet");

            context.addApplicationListener(ContextPathListener.class.getName());

            tomcat.start();
            System.out.println("App URL: http://localhost:" + SERVER_PORT + CONTEXT_PATH);
            tomcat.getServer().await();
        } catch (LifecycleException e) {
            throw new RuntimeException("Tomcat Embedded Server loading failed: " + e.getMessage());
        }
    }

    private static String resolveWebappPath() {
        // Try resolving relative to the compiled class location first (works from any working directory)
        try {
            File classesDir = new File(Main.class.getProtectionDomain().getCodeSource().getLocation().toURI());
            // classesDir = .../target/classes  → parent = target → parent = project root
            File projectRoot = classesDir.getParentFile().getParentFile();
            File webapp = new File(projectRoot, "src/main/webapp");
            if (webapp.exists() && webapp.isDirectory()) {
                return webapp.getAbsolutePath();
            }
        } catch (URISyntaxException ignored) {
        }

        // Fallback: try common relative paths so the app still works when run from project root
        String[] candidates = {
            "src/main/webapp",
            "gaming-store/src/main/webapp"
        };
        for (String candidate : candidates) {
            File f = new File(candidate).getAbsoluteFile();
            if (f.exists() && f.isDirectory()) {
                return f.getAbsolutePath();
            }
        }

        throw new RuntimeException(
            "Cannot locate src/main/webapp. Run the app with the project root as the working directory, " +
            "or open gaming-store/ as the IntelliJ project root."
        );
    }
}
