// package ecosentry.admin.adminconsole.security;


// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// import jakarta.servlet.http.HttpServletResponse;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()
//             .authorizeRequests()
//                 .requestMatchers(new AntPathRequestMatcher("/", HttpMethod.GET.name())).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/login", HttpMethod.GET.name())).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/css/**", HttpMethod.GET.name())).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/js/**", HttpMethod.GET.name())).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/api/login", HttpMethod.POST.name())).permitAll()
//                 .requestMatchers(new AntPathRequestMatcher("/login", HttpMethod.POST.name())).permitAll()
//                 .anyRequest().authenticated()
//             .and()
//             .sessionManagement()
//                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Ensure the session policy is stateless
//             .and()
//             .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)  // Add JWT filter
//             .exceptionHandling()
//                 .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED));  // Handle unauthorized requests

//         return http.build();
//     }

//     @Bean
//     public JwtTokenFilter jwtTokenFilter() {
//         return new JwtTokenFilter();
//     }
// }

package ecosentry.admin.adminconsole.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
        successHandler.setRedirectStrategy(new DefaultRedirectStrategy());
        successHandler.setDefaultTargetUrl("/dashboard");

        http
            .csrf().disable()
            .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/home", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/dashboard", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/guides", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/about", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/login", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/css/**", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/js/**", HttpMethod.GET.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/login", HttpMethod.POST.name())).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/login-form", HttpMethod.POST.name())).permitAll()
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"))
            .and()
            .formLogin()
                .loginPage("/login")
                .successHandler(successHandler);

        return http.build();
    }

    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        return new JwtTokenFilter();
    }
}
