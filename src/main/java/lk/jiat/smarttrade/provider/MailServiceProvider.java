package lk.jiat.smarttrade.provider;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import lk.jiat.smarttrade.mail.Mailable;
import lk.jiat.smarttrade.util.Env;

import java.util.Properties;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MailServiceProvider {
    private ThreadPoolExecutor executor;
    private Authenticator authenticator;
    private final BlockingQueue<Runnable> blockingQueue = new LinkedBlockingQueue<>();
    private final Properties properties = new Properties();
    private static MailServiceProvider mailServiceProvider;

    private MailServiceProvider() {
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", true);
        properties.put("mail.smtp.host", Env.get("mail.host"));
        properties.put("mail.smtp.port", Env.get("mail.port"));
    }

    public static MailServiceProvider getInstance() {
        if (mailServiceProvider == null) {
            mailServiceProvider = new MailServiceProvider();
        }
        return mailServiceProvider;
    }

    public void start() {
        authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Env.get("mail.username"), Env.get("mail.password"));
            }
        };
        executor = new ThreadPoolExecutor(2, 5, 5,
                TimeUnit.SECONDS, blockingQueue, new ThreadPoolExecutor.AbortPolicy());
        executor.prestartCoreThread();
        System.out.println("\u001B[32mEmailServiceProvider Initialized...\u001B[32m");
    }

    public Properties getProperties() {
        return properties;
    }

    public Authenticator getAuthenticator() {
        return authenticator;
    }

    public void shutdown() {
        if (executor != null) {
            executor.shutdown();
        }
    }

    public void sendMail(Mailable mailable){
        boolean offer = blockingQueue.offer(mailable);
    }
}
