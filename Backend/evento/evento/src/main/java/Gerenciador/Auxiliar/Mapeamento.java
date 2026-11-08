package Gerenciador.Auxiliar;

import Gerenciador.DTO.ConvidadoDTO;
import Gerenciador.DTO.EventoInputDTO;
import Gerenciador.DTO.EventoOutputDTO;
import Gerenciador.Model.Convidado;
import Gerenciador.Model.Evento;

public class Mapeamento {
    public static Convidado convidadoModel(ConvidadoDTO dto) {
        Convidado convidado = new Convidado();
        convidado.setTelefone(dto.telefone());
        convidado.setMesa(dto.mesa());
        convidado.setQuantidade(dto.quantidade());
        convidado.setEvento(dto.idEvento());
        return convidado;
    }
    public static ConvidadoDTO convidadoDTO(Convidado model) {
        return new ConvidadoDTO(model.getTelefone(),model.getQuantidade(),model.getMesa(),model.getEvento());

    }
    public static Evento eventoModel(EventoInputDTO dto) {
        Evento evento = new Evento();
        evento.setNome(dto.nome());
        evento.setLocal(dto.local());
        evento.setData(dto.data());
        evento.setHora(dto.hora());
        return evento;
    }
    public static EventoOutputDTO eventoDTO(Evento model) {
        return new EventoOutputDTO(model.getNome(),model.getLocal(),model.getData(),model.getHora(),model.getConvidados());

    }
}
