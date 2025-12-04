import lk.jiat.smarttrade.entity.Address;
import lk.jiat.smarttrade.entity.Status;
import lk.jiat.smarttrade.entity.User;
import lk.jiat.smarttrade.mail.VerificationMail;
import lk.jiat.smarttrade.provider.MailServiceProvider;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
//
//        MailServiceProvider.getInstance().start();
//        VerificationMail verificationMail = new VerificationMail("anjana.jiat@gmail.com", "123456");
//        MailServiceProvider.getInstance().sendMail(verificationMail);

        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
//        String s = AppUtil.generateCode();
//        System.out.println(s);
//        try (Session s = HibernateUtil.getSessionFactory().openSession()) {
//            User user = s.createQuery("FROM User u WHERE u.id=:x", User.class)
//                    .setParameter("x", 3)
//                    .getSingleResult();
//
//
//        }
    }
}
