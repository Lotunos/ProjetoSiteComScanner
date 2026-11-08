package Gerenciador.Controller;

import Gerenciador.Model.Convidado;
import Gerenciador.DTO.ConvidadoDTO;
import Gerenciador.Service.ConvidadoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/convidado")
public class ConvidadoController {
    private final ConvidadoService service;
    public ConvidadoController(ConvidadoService service) {
        this.service = service;
    }
    @PostMapping("/criar")
    public ResponseEntity<Convidado> criar(@RequestBody @Valid ConvidadoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }
    @PutMapping("/atualizar")
    public ResponseEntity<Convidado> atualizar(@RequestBody @Valid ConvidadoDTO dto) {
        return ResponseEntity.ok(service.atualizar(dto));
    }
    @DeleteMapping("/deletar'/{telefone}'")
    public ResponseEntity<Void> deletar(@PathVariable int telefone) {
        service.deletar(telefone);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Convidado>> listar() {
        return ResponseEntity.ok(service.listarConvidadodos());
    }
    @GetMapping("/pegar'/{telefone}'")
    public ResponseEntity<Convidado> buscar(@PathVariable int telefone) {
        return ResponseEntity.ok(service.buscarConvidado(telefone));
    }
}
