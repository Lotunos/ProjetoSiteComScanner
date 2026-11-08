package Gerenciador.DTO;

import Gerenciador.Model.Convidado;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventoOutputDTO(String nome,
                              String local,
                              LocalDate data ,
                              LocalTime hora,
                              List<Convidado> evento) {
}
