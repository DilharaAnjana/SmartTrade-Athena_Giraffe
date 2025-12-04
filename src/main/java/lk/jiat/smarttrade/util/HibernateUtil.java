package lk.jiat.smarttrade.util;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;
    static {
        try{

        sessionFactory = new Configuration().configure().buildSessionFactory();
        }catch (HibernateException e){
            throw new ExceptionInInitializerError("SessionFactory creation failed: "+e.getMessage());
        }
    }
    public static SessionFactory getSessionFactory(){
        return sessionFactory;
    }
    public static void shutdown(){
        sessionFactory.close();
    }
}
