package Gerenciador.Service;

import Gerenciador.Auxiliar.Mapeamento;
import Gerenciador.DTO.EventoInputDTO;
import Gerenciador.Model.Evento;
import Gerenciador.Model.Usuario;
import Gerenciador.Repository.EventoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventoService {
    private final EventoRepository Repository;
    public EventoService(EventoRepository Repository) {
        this.Repository = Repository;
    }
    @Transactional
    public Evento criar(EventoInputDTO dto) {
       return Repository.save(Mapeamento.eventoModel(dto));
    }
    @Transactional
    public void deletar(UUID id) {
        Repository.deleteById(id);
    }
    @Transactional
    public Evento atualizar(EventoInputDTO dto) {
        //TODO: buscar uma forma de verificar a atualização
       return Repository.save(Mapeamento.eventoModel(dto));
    }
    @Transactional
    public Evento buscarEvento(UUID id) {
        return Repository.getReferenceById(id);
    }
    @Transactional
    public List<Evento> listarEventos() {
        return Repository.findAll();
    }

}
