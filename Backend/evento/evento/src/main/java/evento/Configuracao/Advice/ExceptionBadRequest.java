package evento.Configuracao.Advice;

public class ExceptionBadRequest extends RuntimeException{
    public ExceptionBadRequest(String mensagem){
        super(mensagem);
    }
}
