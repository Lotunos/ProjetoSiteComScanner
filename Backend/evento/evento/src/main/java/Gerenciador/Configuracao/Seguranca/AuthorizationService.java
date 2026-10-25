package Gerenciador.Configuracao.Seguranca;

import Gerenciador.Configuracao.Advice.*;
import Gerenciador.DTO.UsuarioLoginInputDTO;
import Gerenciador.DTO.UsuarioRegistroDTO;
import Gerenciador.Model.Usuario;
import Gerenciador.Repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {
    private final UsuarioRepository repository;
    private final AuthenticationManager manager;
    private final TokenService tokenService;
    public AuthorizationService(UsuarioRepository repository, @Lazy AuthenticationManager manager, TokenService tokenService){
        this.repository = repository;
        this.manager = manager;
        this.tokenService = tokenService;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }

    public String login(UsuarioLoginInputDTO dto){
        UsernamePasswordAuthenticationToken userpass = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
        Authentication auth = this.manager.authenticate(userpass);
        Usuario user = (Usuario) auth.getPrincipal();
        return tokenService.gerarToken(user);

    }
    @Transactional
    public void registro(UsuarioRegistroDTO dto) {
        if (repository.findByLogin(dto.login()) != null) {
            throw new ExceptionBadRequest("Já existe um usuário com este login");
        }
        String senha = new BCryptPasswordEncoder().encode(dto.senha());
        Usuario usuario = new Usuario(dto.login(),senha,dto.email());
        repository.save(usuario);
    }
}
