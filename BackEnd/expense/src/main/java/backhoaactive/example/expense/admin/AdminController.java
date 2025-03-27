package backhoaactive.example.expense.admin;


import backhoaactive.example.expense.User.dto.request.UserCreationRequest;
import backhoaactive.example.expense.User.dto.response.UserResponse;
import backhoaactive.example.expense.dtoGlobal.response.ApiResponse;
import backhoaactive.example.expense.enums.Roles;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Slf4j
public class AdminController {
    private final AdminService adminService;

    public AdminController(final AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/createAdmin")
    public ApiResponse<UserResponse> createAdmin(@RequestBody UserCreationRequest userCreationRequest) {
        log.info("Creating Admin");
        return ApiResponse.<UserResponse>builder()
                .data(adminService.createByRoles(userCreationRequest, Roles.ADMIN))
                .success(true)
                .status(HttpStatus.OK)
                .build();
        }
    @PostMapping("createManager")
    public ApiResponse<UserResponse> createManager(@RequestBody UserCreationRequest userCreationRequest) {
        log.info("Creating Manager");
        return ApiResponse.<UserResponse>builder()
                .data(adminService.createByRoles(userCreationRequest,Roles.MANAGER))
                .status(HttpStatus.OK)
                .build();
    }
    @PostMapping("createFinance")
    public ApiResponse<UserResponse> createFinance(@RequestBody UserCreationRequest userCreationRequest) {
        log.info("Creating Finance");
        return ApiResponse.<UserResponse>builder()
                .data(adminService.createByRoles(userCreationRequest,Roles.FINANCE_MANAGER))
                .status(HttpStatus.OK)
                .build();
    }
    @PostMapping("createUser")
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest userCreationRequest) {
        log.info("Creating Finance");
        return ApiResponse.<UserResponse>builder()
                .data(adminService.createByRoles(userCreationRequest,Roles.USER))
                .status(HttpStatus.OK)
                .build();
    }

}
