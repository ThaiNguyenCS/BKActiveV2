package backhoaactive.example.expense.Expense.dto.request;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdateRequestDTO {
    @Positive
    Double amount;
    String typeExpense;
}
