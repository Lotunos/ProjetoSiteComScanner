package Gerenciador.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID idEvento;
    private String nome;
    private String local;
    private LocalDate data;
    private LocalTime hora;
    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Convidado> convidados = new ArrayList<>();
}
