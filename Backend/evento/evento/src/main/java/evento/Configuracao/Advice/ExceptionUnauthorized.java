package evento.Configuracao.Advice;

public class ExceptionUnauthorized extends RuntimeException{
    public ExceptionUnauthorized(String mensagem) {
        super(mensagem);
    }
}
