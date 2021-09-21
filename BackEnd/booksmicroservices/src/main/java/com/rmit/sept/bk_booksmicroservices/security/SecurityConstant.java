package com.rmit.sept.bk_booksmicroservices.security;

public class SecurityConstant {

    public static final String SIGN_UP_URLS = "/api/**";
    public static final String H2_URL = "/h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 5184000000L; //30 seconds
}
