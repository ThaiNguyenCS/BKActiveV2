package backhoaactive.example.expense.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    USER_EXISTED(1001, "Người dùng đã tồn tại, vui lòng kiểm tra lại username, email, hoặc mssv", HttpStatus.BAD_REQUEST),
    USER_INVALID(1001, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    UNCATEGORIZED_EXCEPTION(999, "Lỗi không xác định", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_PASS(1200, "Mật khẩu phải dài ít nhất 8 ký tự và tối đa 20 ký tự", HttpStatus.BAD_REQUEST),
    INCORRECT_PASS(1200, "Mật khẩu không chính xác", HttpStatus.BAD_REQUEST),
    INVALID_USER(1200, "Tên người dùng phải dài ít nhất 8 ký tự và tối đa 20 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1111, "Có vấn đề xảy ra trên máy chủ", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED_EXCEPTION(9999, "Chưa xác thực", HttpStatus.UNAUTHORIZED),
    ACCESS_DENIED(1111, "Truy cập bị từ chối", HttpStatus.FORBIDDEN),
    PERMISSION_INVALID(1111, "Không đủ quyền", HttpStatus.FORBIDDEN),
    PERMISSION_EXISTED(1001, "Quyền đã tồn tại", HttpStatus.CONFLICT),
    INVALID_DEPARTMENT_NAME(2001, "Tên không hợp lệ hoặc đã trùng", HttpStatus.BAD_REQUEST),
    INVALID_DEPARTMENT_ID(2001, "Id không hợp lệ ", HttpStatus.BAD_REQUEST),
    MISSING_REQUEST_BODY(2004, "Request body is missing", HttpStatus.BAD_REQUEST),
    NOT_ALLOWED(2000, "Forbidden", HttpStatus.FORBIDDEN),
    RESOURCE_NOT_FOUND(4000, "Not found", HttpStatus.NOT_FOUND),
    INVALID_VALUE(2200, "invalid field", HttpStatus.BAD_REQUEST),
    MISSING_FIELD(3000, "Field is missing", HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
