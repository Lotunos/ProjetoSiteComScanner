package evento.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioLoginInputDTO(
        @Size(max=24)
        @NotBlank
        String login,
        @Size(min=8, max=12)
        @NotBlank
        String senha) {
}
