package backhoaactive.example.expense.config;

import backhoaactive.example.expense.dtoGlobal.response.ApiResponse;
import backhoaactive.example.expense.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED_EXCEPTION;

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = ApiResponse.builder()
                .message(errorCode.getMessage())
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getHttpStatusCode().value());
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
