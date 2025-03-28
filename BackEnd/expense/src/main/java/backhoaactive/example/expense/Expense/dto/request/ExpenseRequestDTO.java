package backhoaactive.example.expense.Expense.dto.request;

import backhoaactive.example.expense.enums.Process;
import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseRequestDTO {
    String id = null;
    LocalDate requestCreationDate = null;
    String requestStatus = null;
}
