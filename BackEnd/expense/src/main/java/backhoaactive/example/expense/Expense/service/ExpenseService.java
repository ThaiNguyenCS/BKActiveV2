package backhoaactive.example.expense.Expense.service;


import backhoaactive.example.expense.Expense.dto.request.ExpenseRequestDTO;
import backhoaactive.example.expense.Expense.model.Record;
import backhoaactive.example.expense.Expense.repository.ExpenseRequestRepository;
import backhoaactive.example.expense.User.entity.User;
import backhoaactive.example.expense.User.repository.UserRepository;
import backhoaactive.example.expense.department.entity.Department;
import backhoaactive.example.expense.enums.Process;
import backhoaactive.example.expense.enums.Roles;
import backhoaactive.example.expense.exception.AppException;
import backhoaactive.example.expense.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private static final Logger log = LoggerFactory.getLogger(ExpenseService.class);
    private final ExpenseRequestRepository repository;
    private final UserRepository userRepository;

    public void createExpenseRequest(Record record) {
        System.out.print(record.toString());
        this.repository.save(record);
    }

    public Record updateExpenseStatusRequest(User user, Record updatedRecord) {

        Optional<Record> oldRecordOp = this.repository.findById(updatedRecord.getId());
        if (oldRecordOp.isEmpty()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND, "Not found expense request " + updatedRecord.getId());
        }
        Record oldRecord = oldRecordOp.get();
        if (user.getRole() == Roles.FINANCE_MANAGER) {
            updatedRecord.setFinancialId(user.getId()); // update financialId of this request
            return this.updateExpenseRequestForFinancial(oldRecord, updatedRecord);
        } else if (user.getRole() == Roles.MANAGER) {
            updatedRecord.setManagerId(user.getId()); // update managerId of this request
            return this.updateExpenseRequestForManager(oldRecord, updatedRecord);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED);
        }
    }

    public Record updateExpenseRequest(User user, Record updatedRecord) {
        Optional<Record> oldRecordOp = this.repository.findById(updatedRecord.getId());
        if (oldRecordOp.isEmpty()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND, "Not found expense request " + updatedRecord.getId());
        }
        Record oldRecord = oldRecordOp.get();
        if (user.getRole() == Roles.USER) {
            return this.updateExpenseRequestForEmployee(oldRecord, updatedRecord);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED);
        }
    }

    private Record updateExpenseRequestForManager(Record oldRecord, Record updatedRecord) {
        if (oldRecord.getProcess().canManagerUpdate(updatedRecord.getProcess())) {
            oldRecord.setProcess(updatedRecord.getProcess());
            return this.repository.save(oldRecord);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED);
        }
    }

    private Record updateExpenseRequestForFinancial(Record oldRecord, Record updatedRecord) {
        if (oldRecord.getProcess().canFinancialUpdate(updatedRecord.getProcess())) {
            oldRecord.setProcess(updatedRecord.getProcess());
            return this.repository.save(oldRecord);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED);
        }
    }

    private Record updateExpenseRequestForEmployee(Record oldRecord, Record updatedRecord) {
        if (oldRecord.getProcess() == Process.Waiting) {
            if (updatedRecord.getAmount() != null) {
                oldRecord.setAmount(updatedRecord.getAmount());
            }
            if (updatedRecord.getTypeExpense() != null) {
                oldRecord.setTypeExpense(updatedRecord.getTypeExpense());
            }
            return this.repository.save(oldRecord);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED, "You cannot modify this request anymore");
        }
    }

    public Page<Record> getExpenses(User user, ExpenseRequestDTO dto, Pageable pageable) {
        // Lọc theo list userId
        // Lọc theo process value (nếu có override từ user)
        // Lọc theo ngày request
        // Sắp xếp theo ngày request

        // chia role
        List<String> userIds = new ArrayList<>();
        Page<Record> page;
        List<Process> processes = new ArrayList<>();
        if (user.getRole() == Roles.USER) {
            // lấy của chính nó
            userIds.add(user.getId());
        } else if (user.getRole() == Roles.MANAGER) {
            // lấy của department của nó
            Department department = user.getDepartment();

            // tìm tất cả employee thuộc department đó

            List<User> users = userRepository.findAllByDepartment(department);
            userIds = users.stream()
                    .map(User::getId)
                    .collect(Collectors.toList());

        } else if (user.getRole() == Roles.FINANCE_MANAGER) {
            // lấy hết với process từ Manager_accepted trở đi
            processes.add(Process.ManagerAccepted);
            processes.add(Process.FinancialAccepted);
            processes.add(Process.FinancialDenied);
        } else {
            throw new AppException(ErrorCode.NOT_ALLOWED);
        }
        try {
            page = this.repository.findWithFilters(dto.getRequestStatus() != null ? List.of(Process.valueOf(dto.getRequestStatus())) : processes, userIds, dto.getId(), pageable);
            return page;
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.INVALID_VALUE, "Invalid requestStatus: '" + dto.getRequestStatus() + "'. Allowed values: " + Arrays.toString(Process.values()));
        }
    }


}
