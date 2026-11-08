package Gerenciador.Controller;

import Gerenciador.Model.Evento;
import Gerenciador.DTO.EventoInputDTO;
import Gerenciador.Service.EventoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/eventos")
public class EventoController {
    private final EventoService service;
    public EventoController(EventoService service) {
        this.service = service;
    }
    @PostMapping("/criar")
    public ResponseEntity<Evento> criar(@RequestBody @Valid EventoInputDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }
    @PutMapping("/atualizar")
    public ResponseEntity<Evento> atualizar(@RequestBody @Valid EventoInputDTO dto) {
        return ResponseEntity.ok(service.atualizar(dto));
    }
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Evento>> listar() {
        return ResponseEntity.ok(service.listarEventos());
    }
    @GetMapping("/pegar/{id}")
    public ResponseEntity<Evento> buscar(@PathVariable UUID id) {
        return ResponseEntity.ok(service.buscarEvento(id));
    }
}
