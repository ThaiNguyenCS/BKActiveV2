package backhoaactive.example.expense.Expense.model;

import backhoaactive.example.expense.enums.Process;
import backhoaactive.example.expense.enums.TypeExpense;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String employeeId;
    String managerId;
    String financialId;


    LocalDateTime updatedAt;
    LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    Process process;

    @PrePersist
    public void setDefaultProcess() {
        if (process == null) {
            process = Process.Waiting;  // Default value
        }
    }

    @Enumerated(EnumType.STRING)
    TypeExpense typeExpense;

    Double amount;

    @PreUpdate
    public void updateTimestamp() {
        updatedAt = LocalDateTime.now();  // Update on modification
    }

}
