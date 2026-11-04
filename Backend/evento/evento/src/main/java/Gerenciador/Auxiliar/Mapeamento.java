package Gerenciador.Auxiliar;

import Gerenciador.DTO.ConvidadoDTO;
import Gerenciador.Model.Convidado;

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
}
