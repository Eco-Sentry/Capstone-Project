package ecosentry.admin.adminconsole.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @SuppressWarnings("deprecation")
//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()
//             .authorizeRequests(authz -> authz
//                 .requestMatchers(new AntPathRequestMatcher("/", "GET"),
//                                  new AntPathRequestMatcher("/login", "GET"),
//                                  new AntPathRequestMatcher("/css/**", "GET"),
//                                  new AntPathRequestMatcher("/dashboard", "GET"),
//                                  new AntPathRequestMatcher("/api/login", "POST"),
//                                  new AntPathRequestMatcher("/js/**", "GET")).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/**")).authenticated()
//                 .requestMatchers("/login").permitAll()
//             )
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .formLogin(form -> form
//                 .loginPage("/login")
//                 .defaultSuccessUrl("/dashboard", true)
//                 .permitAll()
//             )
//             .logout(logout -> logout.permitAll());

//         // Add JWT filter before UsernamePasswordAuthenticationFilter
//         http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public JwtTokenFilter jwtTokenFilter() {
//         return new JwtTokenFilter();
//     }
// }

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/login", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/css/**", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/js/**", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/login", HttpMethod.POST.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/login", HttpMethod.POST.name())).permitAll()
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Ensure the session policy is stateless
            .and()
            .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)  // Add JWT filter
            .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED));  // Handle unauthorized requests

        return http.build();
    }

    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        return new JwtTokenFilter();
    }
}
