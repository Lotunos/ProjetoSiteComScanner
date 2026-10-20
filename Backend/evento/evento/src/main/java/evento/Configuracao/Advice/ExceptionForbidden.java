package evento.Configuracao.Advice;

public class ExceptionForbidden extends RuntimeException{
    public ExceptionForbidden(String mensagem){
        super(mensagem);
    }
}
