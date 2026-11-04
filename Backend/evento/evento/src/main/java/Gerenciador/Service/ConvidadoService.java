package Gerenciador.Service;

import Gerenciador.Auxiliar.Mapeamento;
import Gerenciador.Configuracao.Advice.ExceptionNotFound;
import Gerenciador.DTO.ConvidadoDTO;
import Gerenciador.Model.Convidado;
import Gerenciador.Repository.ConvidadoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConvidadoService {
    private final ConvidadoRepository repository;
    public ConvidadoService(ConvidadoRepository repository) {
        this.repository = repository;
    }
    @Transactional
    public Convidado criar(ConvidadoDTO dto) {
        return repository.save(Mapeamento.convidadoModel(dto));
    }
    @Transactional
    public Convidado atualizar(ConvidadoDTO dto) {
        if(repository.findByTelefone(dto.telefone())==null){
            throw new ExceptionNotFound("Convidado não encontrado");
        }
        return repository.save(Mapeamento.convidadoModel(dto));
    }
    @Transactional
    public void deletar(int telefone) {
        if(repository.findByTelefone(telefone)==null){
            throw new ExceptionNotFound("Convidado não encontrado");
        }
        repository.deleteByTelefone(telefone);
    }
    @Transactional
    public List<Convidado> listarConvidadodos() {
        return repository.findAll();
    }
    @Transactional
    public Convidado buscarConvidado(int telefone) {
        return repository.findByTelefone(telefone);
    }

}
