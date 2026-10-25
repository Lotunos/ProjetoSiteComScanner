package Gerenciador.Repository;

import Gerenciador.Model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConvidadoRepository extends JpaRepository<Convidado, UUID>{
}
