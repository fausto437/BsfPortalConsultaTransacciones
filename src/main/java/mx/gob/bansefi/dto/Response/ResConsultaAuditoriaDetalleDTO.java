package mx.gob.bansefi.dto.Response;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.gob.bansefi.dto.AnotacionesDTO;
import mx.gob.bansefi.dto.AuditoriaDTO;
import mx.gob.bansefi.dto.CabeceraDTO;
import mx.gob.bansefi.dto.GralAnotacionDTO;

/**
 * Created by AppWIns on 10/07/2017.
 */
@AllArgsConstructor
@NoArgsConstructor
public class ResConsultaAuditoriaDetalleDTO extends CabeceraDTO {
    @Getter @Setter
    private String nombreEmpleado;
    @Getter @Setter
    private String nombreAutorizador;
    @Getter @Setter
    private String codigoCentro;
    @Getter @Setter
    private String nombEnt;
}
