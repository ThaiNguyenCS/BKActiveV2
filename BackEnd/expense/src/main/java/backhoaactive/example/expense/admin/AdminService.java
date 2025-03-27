package backhoaactive.example.expense.admin;

import backhoaactive.example.expense.User.dto.request.UserCreationRequest;
import backhoaactive.example.expense.User.dto.response.UserResponse;
import backhoaactive.example.expense.User.entity.User;
import backhoaactive.example.expense.User.mapper.UserMapper;
import backhoaactive.example.expense.User.repository.UserRepository;
import backhoaactive.example.expense.department.DepartmentRepository;
import backhoaactive.example.expense.department.entity.Department;
import backhoaactive.example.expense.enums.Roles;
import backhoaactive.example.expense.exception.AppException;
import backhoaactive.example.expense.exception.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Slf4j
public class AdminService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(UserMapper userMapper, UserRepository userRepository, DepartmentRepository departmentRepository) {
            this.userMapper = userMapper;
            this.userRepository = userRepository;
            this.departmentRepository = departmentRepository;
            this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public UserResponse createByRoles(UserCreationRequest userCreationRequest, Roles role) {
        if (userRepository.existsByUsername(userCreationRequest.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user= userMapper.toUser(userCreationRequest);
        user.setRole(role);
        Department department = departmentRepository.findById(userCreationRequest.getDepartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_DEPARTMENT_ID));
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
        user.setDepartment(department);
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());
        UserResponse userResponse= userMapper.toUserResponse(userRepository.save(user));
        log.info(userResponse.toString());
        return userResponse;
    }
}
