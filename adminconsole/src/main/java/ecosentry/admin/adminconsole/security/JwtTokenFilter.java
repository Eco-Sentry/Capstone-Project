package ecosentry.admin.adminconsole.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;

        // First, try to get the token from the Authorization header
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        // If not found, try to get the token from cookies
        if (token == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("AUTH-TOKEN".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }

        // Log whether the token was found or not
        if (token != null) {
            System.out.println("Token found: " + token);
            if (validateToken(token)) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("user", null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("Token is valid");
            } else {
                System.out.println("Token is invalid");
            }
        } else {
            System.out.println("No Authorization token found");
        }

        filterChain.doFilter(request, response);
    }

    public boolean validateToken(String token) {
        String url = "http://localhost:8082/api/validate-token";
        
        Boolean isValid = restTemplate.postForObject(url, token, Boolean.class);

        System.out.println(isValid);
        return Boolean.TRUE.equals(isValid);
    }
}

