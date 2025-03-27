package backhoaactive.example.expense.Expense.repository;

import backhoaactive.example.expense.Expense.model.Record;
import backhoaactive.example.expense.enums.Process;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ExpenseRequestRepository extends JpaRepository<Record, String>, JpaSpecificationExecutor<Record> {

    List<Record> findByEmployeeIdIn(List<String> employeeIds);

    Page<Record> findByEmployeeId(String employeeId, Pageable pageable);

    static Specification<Record> withFilters(Process process, String userId, String id) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (process != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("process"), process));
            }

            if (userId != null) {
                System.out.println(userId);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("employeeId"), userId));
            }

            if (id != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("id"), id));
            }
//            System.out.println(query);
            return predicate;
        };
    }

    default Page<Record> findWithFilters(Process process, String userId, String id, Pageable pageable) {
        return findAll(withFilters(process, userId, id), pageable);
    }
}
