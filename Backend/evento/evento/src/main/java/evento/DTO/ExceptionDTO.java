package evento.DTO;

import java.time.LocalDateTime;

public record ExceptionDTO(LocalDateTime timestamp,
                           Integer status,
                           String erro,
                           String caminho) {
}
