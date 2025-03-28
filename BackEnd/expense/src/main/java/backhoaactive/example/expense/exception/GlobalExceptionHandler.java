package backhoaactive.example.expense.exception;

import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";

    @ExceptionHandler(value = AppException.class)
    @ResponseBody
    public ResponseEntity<ApiResponse> handleRuntimeException(AppException e) {

        ErrorCode errorCode = e.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(e.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResponseEntity<ApiResponse> exceptionHandler(RuntimeException e) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getHttpStatusCode())
                .body(apiResponse);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {

        ApiResponse apiResponse = new ApiResponse();
        ErrorCode errorCode = ErrorCode.MISSING_REQUEST_BODY;
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(ex.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatusCode())
                .body(apiResponse);

    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<ApiResponse> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        log.info("methodArgumentNotValidExceptionHandler");
        String message = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.MISSING_FIELD;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(
                message);

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<ApiResponse> accessDeniedExceptionHandler(AccessDeniedException e) {

        ErrorCode errorCode = ErrorCode.ACCESS_DENIED;

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = HttpClientErrorException.Unauthorized.class)
    public ResponseEntity<ApiResponse> unauthorizedExceptionHandler(HttpClientErrorException.Unauthorized e) {
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED_EXCEPTION;
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }
}
