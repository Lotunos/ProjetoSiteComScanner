package evento.DTO;

import jakarta.validation.constraints.Size;

public record UsuarioRegistroDTO(@Size(max=24, min=6)
                                 String login,
                                 @Size(max=12, min=8)
                                 String senha,
                                 @Size(max=100)
                                 String email) {
}
