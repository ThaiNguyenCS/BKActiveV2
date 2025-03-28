package backhoaactive.example.expense.Expense.repository;

import backhoaactive.example.expense.Expense.model.Record;
import backhoaactive.example.expense.enums.Process;
import jakarta.persistence.criteria.Order;
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

    static Specification<Record> withFilters(List<Process> processes, List<String> userIds, String id, Pageable pageable) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (processes != null && !processes.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, root.get("process").in(processes));
            }

            if (userIds != null && !userIds.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, root.get("employeeId").in(userIds));
            }

            if (id != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("id"), id));
            }
            if (pageable.getSort().isSorted()) {
                List<Order> orders = pageable.getSort().stream()
                        .map(order -> order.isAscending()
                                ? criteriaBuilder.asc(root.get(order.getProperty()))
                                : criteriaBuilder.desc(root.get(order.getProperty())))
                        .toList();
                query.orderBy(orders);
            }

            return predicate;
        };
    }


    default Page<Record> findWithFilters(List<Process> processes, List<String> userIds, String id, Pageable pageable) {
        return findAll(withFilters(processes, userIds, id, pageable), pageable);
    }
}
