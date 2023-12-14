package raf.aleksabuncic.security;

import io.jsonwebtoken.Claims;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import raf.aleksabuncic.security.service.TokenService;
import raf.aleksabuncic.security.service.impl.TokenServiceImpl;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;

@Aspect
@Configuration
public class SecurityAspect {
    @Value("${oauth.jwt.secret}")
    private String jwtSecret;
    private final TokenService tokenService = new TokenServiceImpl();

    public SecurityAspect() {
    }

    @Around("@annotation(raf.aleksabuncic.security.CheckSecurity)")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        //Get method signature
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        //Check for authorization parameter
        String token = null;
        for (int i = 0; i < methodSignature.getParameterNames().length; i++) {
            if (methodSignature.getParameterNames()[i].equals("authorization")) {
                //Check bearer schema
                if (joinPoint.getArgs()[i].toString().startsWith("Bearer")) {
                    //Get token
                    token = joinPoint.getArgs()[i].toString().split(" ")[1];
                }
            }
        }
        //If token is not presents return UNAUTHORIZED response
        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        //Try to parse token
        Claims claims = tokenService.parseToken(token);
        //If fails return UNAUTHORIZED response
        if (claims == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        //Check user role and proceed if user has appropriate role for specified route
        CheckSecurity checkSecurity = method.getAnnotation(CheckSecurity.class);
        boolean roleRead = claims.get("ROLE_READ", Boolean.class);
        boolean roleAdd = claims.get("ROLE_ADD", Boolean.class);
        boolean roleUpdate = claims.get("ROLE_UPDATE", Boolean.class);
        boolean roleDelete = claims.get("ROLE_DELETE", Boolean.class);

        ArrayList<String> permissions = new ArrayList<>();
        if (roleRead) {
            permissions.add("ROLE_READ");
        }
        if (roleAdd) {
            permissions.add("ROLE_ADD");
        }
        if (roleUpdate) {
            permissions.add("ROLE_UPDATE");
        }
        if (roleDelete) {
            permissions.add("ROLE_DELETE");
        }

        if (permissions.containsAll(Arrays.asList(checkSecurity.roles()))) {
            return joinPoint.proceed();
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

}
