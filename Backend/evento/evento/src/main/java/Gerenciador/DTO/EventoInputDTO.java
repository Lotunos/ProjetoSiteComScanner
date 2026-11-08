package Gerenciador.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventoInputDTO(String nome,
                             String local,
                             LocalDate data ,
                             LocalTime hora) {
}
