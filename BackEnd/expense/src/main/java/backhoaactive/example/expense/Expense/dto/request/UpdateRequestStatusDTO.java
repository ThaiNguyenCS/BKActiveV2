package backhoaactive.example.expense.Expense.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRequestStatusDTO {
    @NotNull(message = "status is required")
    String status;
}
