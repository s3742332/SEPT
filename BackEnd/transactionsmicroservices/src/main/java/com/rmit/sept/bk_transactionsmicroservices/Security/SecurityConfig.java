package com.rmit.sept.bk_transactionsmicroservices.Security;
// import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.core.Ordered;
// import org.springframework.stereotype.Component;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

   @Autowired
   private JwtAuthenticationEntryPoint unauthorizedHandler;

   @Override
   @Bean(BeanIds.AUTHENTICATION_MANAGER)
   protected AuthenticationManager authenticationManager() throws Exception {
       return super.authenticationManager();
   }

   @Bean
   public JwtAuthenticationFilter jwtAuthenticationFilter() {
       return new JwtAuthenticationFilter();
   }

   @Override
   protected void configure(HttpSecurity http) throws Exception {
       // http.cors().and().csrf().disable().exceptionHandling().and().sessionManagement()
       // .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().headers().frameOptions().sameOrigin()
       // // To
       // // enable
       // // H2
       // // Database
       // .and().authorizeRequests()// Make H2-Console non-secured; for debug purposes

       // .antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg",
       // "/**/*.jpg", "/**/*.html",
       // "/**/*.css", "/**/*.js")
       // .permitAll().antMatchers(SecurityConstant.SIGN_UP_URLS).permitAll()
       // // .antMatchers("/api/users/**").permitAll()
       // .antMatchers(SecurityConstant.H2_URL).permitAll().anyRequest().authenticated();

       // http.addFilterBefore(jwtAuthenticationFilter(),
       // UsernamePasswordAuthenticationFilter.class);
       http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().headers()
               .frameOptions().sameOrigin() // To enable H2 Database
               .and().authorizeRequests()// Make H2-Console non-secured; for debug purposes

               .antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html",
                       "/**/*.css", "/**/*.js")
               .permitAll().antMatchers(SecurityConstant.SIGN_UP_URLS).permitAll()
               // .antMatchers("/api/users/**").permitAll()
               .antMatchers(SecurityConstant.H2_URL).permitAll().anyRequest().authenticated();

       http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
   }
}
