package backhoaactive.example.expense.User.services;

import backhoaactive.example.expense.User.dto.request.UserCreationRequest;
import backhoaactive.example.expense.User.dto.request.UserUpdatePasswordRequest;
import backhoaactive.example.expense.User.dto.response.UserResponse;
import backhoaactive.example.expense.User.entity.User;
import backhoaactive.example.expense.User.mapper.UserMapper;
import backhoaactive.example.expense.User.repository.UserRepository;
import backhoaactive.example.expense.department.DepartmentRepository;
import backhoaactive.example.expense.department.entity.Department;
import backhoaactive.example.expense.enums.Roles;
import backhoaactive.example.expense.exception.AppException;
import backhoaactive.example.expense.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class UserService {

    private UserRepository userRepository;
    private final UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    private DepartmentRepository departmentRepository;

    public UserResponse createRequest(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(
                ()-> new AppException(ErrorCode.INVALID_DEPARTMENT_ID)
        );
        user.setDepartment(department);
        user.setRole(Roles.USER);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        log.info("User created: {}", user);
        return userMapper.toUserResponse(user);
    }

    public UserResponse createAdmin(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Roles.ADMIN);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        log.info("User created: {}", user);
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUser(String id) {

        log.info("inside getUser method");

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_INVALID));

        return userMapper.toUserResponse(user);
    }

    public Page<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable).map(userMapper::toUserResponse);
    }


    public UserResponse changePasswordUser(String userID, UserUpdatePasswordRequest userUpdatePasswordRequest) {
        User user = userRepository.findById(userID).orElseThrow(() -> new AppException(ErrorCode.USER_INVALID));
        if (!passwordEncoder.matches(userUpdatePasswordRequest.oldPassword, user.getPassword())) {
            throw new AppException(ErrorCode.INCORRECT_PASS);
        }
        user.setPassword(passwordEncoder.encode(userUpdatePasswordRequest.password));
        return userMapper.toUserResponse(userRepository.save(user));
    }


    public String deleteUser(String id) {
        User userToDelete = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_INVALID));
        userRepository.delete(userToDelete);
        return "Success delete user : " + userToDelete.getUsername();
    }


    public UserResponse getMyInfo() {

        var context = SecurityContextHolder.getContext();

        String name = context.getAuthentication().getName();
        User finduser = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_EXISTED));
        return userMapper.toUserResponse(finduser);
    }

    public User getUserByUserName(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_INVALID));
    }
}
