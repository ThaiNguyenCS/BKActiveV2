package backhoaactive.example.expense.Expense.controller;

import backhoaactive.example.expense.Expense.dto.request.CreateRequestDTO;
import backhoaactive.example.expense.Expense.dto.request.ExpenseRequestDTO;
import backhoaactive.example.expense.Expense.dto.request.UpdateRequestDTO;
import backhoaactive.example.expense.Expense.dto.request.UpdateRequestStatusDTO;
import backhoaactive.example.expense.Expense.dto.response.ExpensesResponseDTO;
import backhoaactive.example.expense.Expense.model.Record;
import backhoaactive.example.expense.Expense.service.ExpenseService;
import backhoaactive.example.expense.User.entity.User;
import backhoaactive.example.expense.User.repository.UserRepository;
import backhoaactive.example.expense.User.services.UserService;
import backhoaactive.example.expense.department.DepartmentRepository;
import backhoaactive.example.expense.department.entity.Department;
import backhoaactive.example.expense.enums.Process;
import backhoaactive.example.expense.enums.Roles;
import backhoaactive.example.expense.enums.TypeExpense;
import backhoaactive.example.expense.exception.ApiResponse;
import backhoaactive.example.expense.exception.AppException;
import backhoaactive.example.expense.exception.ErrorCode;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {
    private static final Logger log = LoggerFactory.getLogger(ExpenseController.class);
    private final ExpenseService service;
    private final UserService userService;

    @GetMapping
    public ApiResponse<ExpensesResponseDTO> getAllRequestForUser(@RequestParam(defaultValue = "createdAt") String sortBy,
                                                                 @RequestParam(defaultValue = "desc") String direction,
                                                                 @ModelAttribute ExpenseRequestDTO dto,
                                                                 @PageableDefault(size = 20) Pageable pageable) {
        log.info("getAllRequestForUser");
        log.info(dto.toString());
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userService.getUserByUserName(name);
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending(); // if value is not desc, sort by ascending
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort); // create pageable object
        List<Record> records = null;
        Page<Record> pageRecord = null;

        pageRecord = this.service.getExpenses(user, dto, sortedPageable);
        records = pageRecord.getContent();
        ExpensesResponseDTO responseDTO = ExpensesResponseDTO.builder()
                .expenses(records)
                .total(pageRecord.getTotalPages())
                .page(pageRecord.getNumber() + 1)
                .limit(pageRecord.getSize())
                .build();
        ApiResponse<ExpensesResponseDTO> response = ApiResponse.<ExpensesResponseDTO>builder()
                .code(200)
                .message("Get expenses successfully")
                .result(responseDTO)
                .build();
        return response;
    }

    @PostMapping
    public ApiResponse<Record> createExpenseRequest(@Valid @RequestBody CreateRequestDTO dto) {
        log.info("createExpenseRequest");
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userService.getUserByUserName(name);
        System.out.println("user " + user.getRole());

        if (user.getRole() == Roles.USER) {
            Record savedRecord = Record.builder()
                    .typeExpense(dto.getTypeExpense())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .amount(dto.getAmount())
                    .employeeId(user.getId())
                    .build();
            this.service.createExpenseRequest(savedRecord);
//            System.out.println("here");

            ApiResponse<Record> response = ApiResponse.<Record>builder()
                    .code(201)
                    .message("create request successfully")
                    .result(null)
                    .build();
            return response;
        } else {
            ApiResponse<Record> response = ApiResponse.<Record>builder()
                    .code(400)
                    .message("Not allowed")
                    .result(null)
                    .build();
            return response;
        }
    }

    @PatchMapping("/{requestId}")
    public ApiResponse<Record> updateExpenseRequest(@RequestBody UpdateRequestDTO dto, @PathVariable("requestId") String requestId) {
        log.info("updateExpenseRequest");
        log.info(dto.toString());
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userService.getUserByUserName(name);
        TypeExpense updatedType = null;
        if (dto.getTypeExpense() != null) {
            try {
                updatedType = TypeExpense.valueOf(dto.getTypeExpense());
            } catch (IllegalArgumentException e) {
                throw new AppException(ErrorCode.INVALID_VALUE, e.getMessage());
            }
        }

        Record updatedRecord = Record.builder()
                .id(requestId)
                .typeExpense(updatedType)
                .amount(dto.getAmount())
                .build();
        Record newRecord = this.service.updateExpenseRequest(user, updatedRecord);
        ApiResponse<Record> response = ApiResponse.<Record>builder()
                .message("Update request expense successfully")
                .code(200)
                .result(newRecord) // Assuming `result` is a valid builder method
                .build();
        return response;
    }

    @PatchMapping("/{requestId}/status")
    public ApiResponse<Record> updateExpenseStatusRequest(@RequestBody UpdateRequestStatusDTO dto, @PathVariable("requestId") String requestId) {
        log.info("updateExpenseStatusRequest");
        log.info(dto.toString());
        SecurityContext context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userService.getUserByUserName(name);
        Process updatedProcess;
        try {
            updatedProcess = Process.valueOf(dto.getStatus());
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.INVALID_VALUE, e.getMessage());
        }

        Record updatedRecord = Record.builder()
                .process(updatedProcess)
                .id(requestId)
                .build();
        Record newRecord = this.service.updateExpenseStatusRequest(user, updatedRecord);
        ApiResponse<Record> response = ApiResponse.<Record>builder()
                .message("Update request expense status successfully")
                .code(200)
                .result(newRecord) // Assuming `result` is a valid builder method
                .build();
        return response;
    }
}
