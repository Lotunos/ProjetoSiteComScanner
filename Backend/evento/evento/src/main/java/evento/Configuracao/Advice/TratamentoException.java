package evento.Configuracao.Advice;

import evento.DTO.ExceptionDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
@Slf4j
@RestControllerAdvice
public class TratamentoException {
    //TODO: Tratamento dos erros 400
    @ExceptionHandler(ExceptionBadRequest.class)
    public ResponseEntity<ExceptionDTO> tratarErroBadRequest(ExceptionBadRequest ex, HttpServletRequest request){
        ExceptionDTO dto = new ExceptionDTO(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }
    @ExceptionHandler(ExceptionUnauthorized.class)
    public ResponseEntity<ExceptionDTO> tratarErroUnauthorized(ExceptionUnauthorized ex, HttpServletRequest request){
        ExceptionDTO dto = new ExceptionDTO(
                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
    }
    @ExceptionHandler(ExceptionForbidden.class)
    public ResponseEntity<ExceptionDTO> tratarErroForbidden(ExceptionForbidden ex, HttpServletRequest request){
        ExceptionDTO dto = new ExceptionDTO(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(dto);
    }
    @ExceptionHandler(ExceptionNotFound.class)
    public ResponseEntity<ExceptionDTO> tratarErroNotFound(ExceptionNotFound ex, HttpServletRequest request){
        ExceptionDTO dto = new ExceptionDTO(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(dto);
    }
    //TODO: Tratamento de erro 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDTO> tratarErro500(Exception ex, HttpServletRequest request){
        ExceptionDTO dto = new ExceptionDTO(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }

}
