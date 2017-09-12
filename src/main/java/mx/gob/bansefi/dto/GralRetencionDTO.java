package mx.gob.bansefi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by AppWhere on 4/28/2017.
 */
@AllArgsConstructor
@NoArgsConstructor
public class GralRetencionDTO {
	@Getter @Setter
	private String tipo;
	@Getter @Setter
	private String estado;
	@Getter @Setter
	private String fecAlta;
	@Getter @Setter
	private String fecVto;
	@Getter @Setter
	private String concepto;
	@Getter @Setter
	private String empleado;
	@Getter	@Setter
	private String origen;
	@Getter	@Setter
	private String importe;
}
