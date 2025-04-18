package backhoaactive.example.expense.User.controller;


import backhoaactive.example.expense.User.dto.request.UserCreationRequest;
import backhoaactive.example.expense.User.dto.request.UserUpdatePasswordRequest;
import backhoaactive.example.expense.User.dto.response.UserResponse;
import backhoaactive.example.expense.User.services.UserService;
import backhoaactive.example.expense.enums.Roles;
import backhoaactive.example.expense.exception.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest user) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.createRequest(user));
        return apiResponse;
    }

    @PostMapping("/createAdmin")
    ApiResponse<UserResponse> createAdmin(@RequestBody @Valid UserCreationRequest user) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.createAdmin(user));
        return apiResponse;
    }
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {

        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.getUser(userId));

        return apiResponse;
    }

    @GetMapping()
    ApiResponse<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
            )  {

        log.info("getAllUsers");

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        authentication
                .getAuthorities()
                .forEach(grantedAuthority -> log.info("GrantedAuthority: {}", grantedAuthority.getAuthority()));

        ApiResponse<Page<UserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.getAllUsers(page,size));
        return apiResponse;
    }


    @PutMapping("/{userId}/password")
    ApiResponse<UserResponse> updateUser(@PathVariable("userId") String userId, @RequestBody UserUpdatePasswordRequest user) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.changePasswordUser(userId, user));
        return apiResponse;
    }


    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable("userId") String userId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(200);
        apiResponse.setResult(userService.deleteUser(userId));
        return apiResponse;
    }
}
