package de.giek.uniplanner.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthEntryPoint jwtAuthEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(crsf -> crsf.disable());
        http.exceptionHandling(exceptionhandling -> exceptionhandling.authenticationEntryPoint(jwtAuthEntryPoint));
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests((authorizeRequests) -> {
            authorizeRequests.requestMatchers("/api/v1/users/register").permitAll();
            authorizeRequests.requestMatchers("/api/v1/users/login").permitAll();
            authorizeRequests.requestMatchers("/api/getSomething").permitAll();
            authorizeRequests.requestMatchers("/api/v1/data/*").permitAll();
            authorizeRequests.requestMatchers("/api/v1/data/modules/*").permitAll();

            authorizeRequests.requestMatchers("/api/v1/data/moduleParts/*").permitAll();
            authorizeRequests.requestMatchers("/api-docs/*").permitAll();
            authorizeRequests.requestMatchers("/api-docs").permitAll();
            authorizeRequests.requestMatchers("/api-docs-ui").permitAll();
            authorizeRequests.requestMatchers("/swagger-ui/*").permitAll();
            authorizeRequests.requestMatchers("/api-swagger-config").permitAll();
            authorizeRequests.anyRequest().authenticated();

        })
            .cors(cors -> cors.configurationSource(myWebsiteConfigurationSource()))
                .httpBasic(withDefaults());
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
	CorsConfigurationSource myWebsiteConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://uniplanner.nomiskeig.de", "https://128.140.7.110:3001", "http://uniplanner.nomiskeig.de"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
