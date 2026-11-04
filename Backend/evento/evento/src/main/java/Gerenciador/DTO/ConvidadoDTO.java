package Gerenciador.DTO;

import jakarta.validation.constraints.Size;

public record ConvidadoDTO(
        @Size(min = 11, max = 11, message = "O telefone tem que ter DDD")
        int telefone,
        int quantidade,
        int mesa ,
        int idEvento
        ) {
}
