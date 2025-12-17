package lk.jiat.smarttrade.util;

import jakarta.ws.rs.core.MultivaluedMap;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;

public class PayHereUtil {
    private static final String MERCHANT_ID = "1231403"; // replace with your merchant id
    private static final String MERCHANT_SECRET = "MjIyNTA3MDU2MzYzNTQxMTcwNDE1MDQ3NzA3OTMzNTA3NjU4MzM0"; // replace with your merchant secret

    public static String getMerchantId() {
        return MERCHANT_ID;
    }

    public static String getMerchantSecret() {
        return MERCHANT_SECRET;
    }

    public static String generateHash(String orderId, double amount, String currency) {

        String formattedAmount = String.format(Locale.US, "%.2f", amount);

        String secretHash = md5(MERCHANT_SECRET).toUpperCase();

        String raw = MERCHANT_ID
                + orderId
                + formattedAmount
                + currency
                + secretHash;

        return md5(raw).toUpperCase();
    }

    public static boolean validateNotify(MultivaluedMap<String, String> form) {

        String merchantId = form.getFirst("merchant_id");
        String orderId = form.getFirst("order_id");
        String amount = form.getFirst("payhere_amount");
        String currency = form.getFirst("payhere_currency");
        String statusCode = form.getFirst("status_code");
        String receivedSig = form.getFirst("md5sig");

        String localSig = md5(
                merchantId +
                        orderId +
                        amount +
                        currency +
                        statusCode +
                        md5(MERCHANT_SECRET).toUpperCase()
        ).toUpperCase();

        return localSig.equals(receivedSig);
    }

    private static String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 error", e);
        }
    }
}
