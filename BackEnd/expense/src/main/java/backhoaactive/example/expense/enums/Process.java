package backhoaactive.example.expense.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public enum Process {
    Waiting, ManagerAccepted, ManagerDenied, FinancialAccepted, FinancialDenied, Completed;

    @JsonCreator
    public static Process fromString(String value) {
        return Arrays.stream(Process.values())
                .filter(p -> p.name().equalsIgnoreCase(value)) // Match case-insensitively
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid requestStatus: '" + value + "'. Allowed values: " + Arrays.toString(Process.values())
                ));
    }

    // Define allowed actions for Financial manager
    private static final Map<Process, List<Process>> FINANCIAL_ALLOWED_TRANSITIONS = Map.of(
            ManagerAccepted, List.of(FinancialAccepted, FinancialDenied, Completed)
    );

    public boolean canFinancialUpdate(Process newStatus) {
        return FINANCIAL_ALLOWED_TRANSITIONS.getOrDefault(this, List.of()).contains(newStatus);
    }

    // Define allowed actions for Manager
    private static final Map<Process, List<Process>> MANAGER_ALLOWED_TRANSITIONS = Map.of(
            Waiting, List.of(ManagerAccepted, ManagerDenied)
    );

    public boolean canManagerUpdate(Process newStatus) {
        return MANAGER_ALLOWED_TRANSITIONS.getOrDefault(this, List.of()).contains(newStatus);
    }

    @JsonValue
    public String toString() {
        return name(); // Ensures JSON outputs the correct name
    }
}
