package lk.jiat.smarttrade.util;

import com.google.gson.Gson;

import java.security.SecureRandom;

public class AppUtil {
    public static final Gson GSON = new Gson();
    public static final int DEFAULT_SELECTOR_VALUE = 0;
    public static final String MAIN_APP_CURRENCY = "LKR";
    public static final String APP_COUNTRY = "Sri Lanka";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String generateCode() {
        int randomNumber = SECURE_RANDOM.nextInt(1_000_000);
        return "%6d".formatted(randomNumber);
    }
}
