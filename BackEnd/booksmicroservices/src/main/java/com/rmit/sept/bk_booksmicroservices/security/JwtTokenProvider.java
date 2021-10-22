package com.rmit.sept.bk_booksmicroservices.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    //Validate the token
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SecurityConstant.SECRET).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            System.out.println("Invalid JWT Signature");
        }catch (MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        }catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
        }catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }
}

