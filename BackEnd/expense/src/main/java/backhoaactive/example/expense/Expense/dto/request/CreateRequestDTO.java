package backhoaactive.example.expense.Expense.dto.request;

import backhoaactive.example.expense.enums.TypeExpense;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateRequestDTO {
    @NotNull(message = "typeExpense is required")
    TypeExpense typeExpense;
    @NotNull(message = "amount is required")
    @Positive(message = "amount must be positive")
    Double amount;
}
