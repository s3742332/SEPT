package com.rmit.sept.bk_shoppingcart.Security;

import com.rmit.sept.bk_shoppingcart.Services.CustomShoppingCartServiceDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomShoppingCartServiceDetails customShoppingCartServiceDetails;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {

            String jwt = getJWTFromRequest(httpServletRequest);

            if(StringUtils.hasText(jwt)&& tokenProvider.validateToken(jwt)){
                // Long transactionId = tokenProvider.getTransactionIdFromJWT(jwt);
                // Transaction transactionDetails = customTransactionServiceDetails.loadTransactionById(transactionId);

                // UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                //         transactionDetails, null, Collections.emptyList());

                // authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                // SecurityContextHolder.getContext().setAuthentication(authentication);

            }

        }catch (Exception ex){
            logger.error("Could not set user authentication in security context", ex);
        }


        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }



    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader(SecurityConstant.HEADER_STRING);

        if(StringUtils.hasText(bearerToken)&&bearerToken.startsWith(SecurityConstant.TOKEN_PREFIX)){
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }
}