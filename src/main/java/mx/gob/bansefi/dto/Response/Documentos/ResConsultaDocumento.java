package mx.gob.bansefi.dto.Response.Documentos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by app on 01/08/2017.
 */
@AllArgsConstructor
@NoArgsConstructor
public class ResConsultaDocumento {
    @Setter @Getter
    private String getDocumentoDigitalizadoResp;
    @Setter @Getter
    private String codTipoDocumento;
}
