package lk.jiat.smarttrade.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import lk.jiat.smarttrade.dto.UserDTO;
import lk.jiat.smarttrade.entity.Address;
import lk.jiat.smarttrade.entity.Status;
import lk.jiat.smarttrade.entity.User;
import lk.jiat.smarttrade.mail.VerificationMail;
import lk.jiat.smarttrade.provider.MailServiceProvider;
import lk.jiat.smarttrade.util.AppUtil;
import lk.jiat.smarttrade.util.HibernateUtil;
import lk.jiat.smarttrade.validation.Validator;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

public class UserService {

    public String userLogin(UserDTO userDTO, @Context HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        ///  login handling code | user authentication part-start
        if (userDTO.getEmail() == null) {
            message = "Email is required!";
        } else if (userDTO.getEmail().isBlank()) {
            message = "Email address can not be empty!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide valid email address!";
        } else if (userDTO.getPassword() == null) {
            message = "Password is required!";
        } else if (userDTO.getPassword().isBlank()) {
            message = "Password can not be empty!";
        } else if (!userDTO.getPassword().matches(Validator.PASSWORD_VALIDATION)) {
            message = "Please provide valid password. \n " +
                    "The password must be at least 8 characters long and include at least one uppercase letter, " +
                    "one lowercase letter, one digit, and one special character";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            User singleUser = hibernateSession.createNamedQuery("User.getByEmail", User.class)
                    .setParameter("email", userDTO.getEmail())
                    .getSingleResultOrNull();
            if (singleUser == null) { // not found
                message = "Account not found. Please register first!";
            } else {
                if (!singleUser.getPassword().equals(userDTO.getPassword())) {
                    message = "Something went wrong. Please check your login credentials!";
                } else {
                    Status verifiedStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                            .setParameter("value", String.valueOf(Status.Type.VERIFIED))
                            .getSingleResult();
                    if (!singleUser.getStatus().equals(verifiedStatus)) {
                        message = "Your account is not verified. Please verify first!";
                    } else {
                        HttpSession httpSession = request.getSession();
                        httpSession.setAttribute("user", singleUser);
                        status = true;
                        message = "Login successful";
                    }
                }
            }
            hibernateSession.close();
        }
        ///  login handling code | user authentication part-end


        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String verifyUserAccount(UserDTO userDTO) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        ///  logic handling part
        if (userDTO.getEmail() == null) {
            message = "Email is required!";
        } else if (userDTO.getEmail().isBlank()) {
            message = "Email address can not be empty!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide valid email address!";
        } else if (userDTO.getVerificationCode() == null) {
            message = "Verification is required!";
        } else if (userDTO.getVerificationCode().isBlank()) {
            message = "Verification code can not be empty!";
        } else if (!userDTO.getVerificationCode().matches(Validator.VERIFICATION_CODE_VALIDATION)) {
            message = "Please provide valid verification code!. Verification code must have 6 digits";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            User user = hibernateSession.createQuery("FROM User u WHERE u.email=:email AND u.verificationCode=:verificationCode", User.class)
                    .setParameter("email", userDTO.getEmail())
                    .setParameter("verificationCode", userDTO.getVerificationCode())
                    .getSingleResultOrNull();
            if (user == null) {
                message = "Account not found. Please register first!";
            } else {
                Status verifiedStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                        .setParameter("value", String.valueOf(Status.Type.VERIFIED))
                        .getSingleResult();

                if (user.getStatus().equals(verifiedStatus)) {
                    message = "Account already verified!";
                } else {
                    user.setStatus(verifiedStatus);
                    user.setVerificationCode("");
                    Transaction transaction = hibernateSession.beginTransaction();
                    try {
                        hibernateSession.merge(user);
                        transaction.commit();
                        status = true;
                        message = "Account verification completed!";
                    } catch (HibernateException e) {
                        transaction.rollback();
                        message = "Something went wrong. Verification process failed!";
                    }
                }
            }
            hibernateSession.close();
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String addNewUser(UserDTO userDTO) {
        JsonObject responseObject = new JsonObject();

        boolean status = false;
        String message;

        if (userDTO.getFirstName() == null) {
            message = "First name is required!";
        } else if (userDTO.getFirstName().isBlank()) {
            message = "First name can not be empty!";
        } else if (userDTO.getLastName() == null) {
            message = "Last name is required!";
        } else if (userDTO.getLastName().isBlank()) {
            message = "Last name can not be empty!";
        } else if (userDTO.getEmail() == null) {
            message = "Email is required!";
        } else if (userDTO.getEmail().isBlank()) {
            message = "Email can not be empty!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide valid email address!";
        } else if (userDTO.getPassword() == null) {
            message = "Password is required!";
        } else if (userDTO.getPassword().isBlank()) {
            message = "Password can not be empty!";
        } else if (!userDTO.getPassword().matches(Validator.PASSWORD_VALIDATION)) {
            message = "Please provide valid password. \n " +
                    "The password must be at least 8 characters long and include at least one uppercase letter, " +
                    "one lowercase letter, one digit, and one special character";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            User singleUser = hibernateSession.createNamedQuery("User.getByEmail", User.class)
                    .setParameter("email", userDTO.getEmail())
                    .getSingleResultOrNull();

            if (singleUser != null) { // Already exists
                message = "This email already exists! Please use another email";
            } else {
                User u = new User();
                u.setFirstName(userDTO.getFirstName());
                u.setLastName(userDTO.getLastName());
                u.setEmail(userDTO.getEmail());
                u.setPassword(userDTO.getPassword());

                String verificationCode = AppUtil.generateCode();

                u.setVerificationCode(verificationCode);

                Status pendingStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                        .setParameter("value", String.valueOf(Status.Type.PENDING)).getSingleResult();

                u.setStatus(pendingStatus);

                Transaction transaction = hibernateSession.beginTransaction();

                try {
                    hibernateSession.persist(u);
                    transaction.commit();

                    /// verification-mail-sending-start
                    VerificationMail verificationMail = new VerificationMail(u.getEmail(), verificationCode);
                    MailServiceProvider.getInstance().sendMail(verificationMail);
                    /// verification-mail-sending-end

                    status = true;
                    message = "Account created successfully. Verification code has been sent to the your email. " +
                            "Please verify it for activate your account!";


                } catch (HibernateException e) {
                    transaction.rollback();
                    message = "Account creation failed. Please try again!";
                }


            }
            hibernateSession.close();
        }
        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

}
