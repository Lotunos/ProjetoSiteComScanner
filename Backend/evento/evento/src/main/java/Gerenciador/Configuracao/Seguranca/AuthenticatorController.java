package Gerenciador.Configuracao.Seguranca;

import Gerenciador.DTO.UsuarioLoginInputDTO;
import Gerenciador.DTO.UsuarioLoginOutputDTO;
import Gerenciador.DTO.UsuarioRegistroDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticatorController {
    private final AuthorizationService service;

    public AuthenticatorController(AuthorizationService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioLoginOutputDTO> login(@RequestBody @Valid UsuarioLoginInputDTO dto) {
        return ResponseEntity.ok(new UsuarioLoginOutputDTO(service.login(dto)));
    }
    @PostMapping("/registro")
    public ResponseEntity<Void> registro(@RequestBody @Valid UsuarioRegistroDTO dto){
        service.registro(dto);
        return ResponseEntity.ok().build();
    }

}