/**
 * Created by AppWhere on 08/09/2017.
 */
var numId=false;
var validId=false;
var loading;
$(document).ready(function(){
	
	nomPath = window.location.pathname;
    nomPath = nomPath.substring(1, nomPath.length);
    nomPath = nomPath.split("/", 1);
    nomPath = nomPath + "/";
    
	startDB();
	maskInput();
	iniBootbox();
	$("#cboTipoIdentificacion").change(function () {
        $("#txtTipoIdentificacion").val($("#cboTipoIdentificacion option:selected").text());
        $("#codTipoIdentificacion").val($("#cboTipoIdentificacion option:selected").val());
    });
	
	$("#cboTipoIdentificacionDigitalizacion").change(function () {
        $("#txtTipoIdentificacionDigitalizacion").val($("#cboTipoIdentificacionDigitalizacion option:selected").text());
        $("#codTipoIdentificacionDigitalizacion").val($("#cboTipoIdentificacionDigitalizacion option:selected").val());
    });
})

//Funcion para crear el mensaje de carga de las solicitudes.
function iniBootbox(){
	var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">' + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">'
    + '<div class="progress-shadow">' + '</div></div></div></div><br/>' + '<label class="ui-widget ui-state-default ui-corner-all">Cargando...</label></div>';
	loading = bootbox.dialog({
	message : msg,
	closeButton : false,
	show : false
	}).css({
	'top' : '50%',
	'margin-top' : function() {
	    return -(($(this).height() / 2));
	}
	});
}

//Funcion para llenar el combo de tipo de identificacion.
function startDB() {
    try {
        dataBase = indexedDB.open('bansefi', 1);
        dataBase.onsuccess = function (e) {
            CargaCombo($("#cboTipoIdentificacion"),"catalogo_identificacion",cboTipoIdentificacion);
            CargaCombo($("#cboTipoIdentificacionDigitalizacion"),"catalogo_identificacion",cboTipoIdentificacion);
        };
        dataBase.onerror = function (e) {
            console.log('Error al acceder a la Base de datos.');
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: startDB: " + err.message);
    }
}

//Funcion para especificar mascaras de los input.
function maskInput()
{
	$("#numAcuerdo").mask('0000000000', {reverse: true});
}

//Funcion para validar la identificacion de la cuenta.
function validarId(){
	if($("#numAcuerdo").val()==""||$("#txtTipoIdentificacion").val()==undefined){
		msjAlerta("Ingrese el número de cuenta al que se encuentra ligada la identificación.");
		return;
	}
	if($("#txtTipoIdentificacion").val()==""||$("#txtTipoIdentificacion").val()==undefined){
		msjAlerta("Seleccione un tipo de identificación a validar.");
		return;
	}
	if($("#numId").val()==""||$("#numId").val()==undefined){
		msjAlerta("Ingrese el número de identificación a validar.");
		return;
	}
	//var random_boolean = Math.random() >= 0.5;
	var datos={
			tipo_documento: $("#codTipoIdentificacion").val(),
			id_interno_pe: $("#idInternoPe").val()
	};
	$.ajax({
	type : 'POST',
	data : datos,
	url : window.location.protocol + "//" + window.location.host + "/" + nomPath + "getDocumento",
	beforeSend : function() {
	    loading.modal('show');
	},
	success : function(data) {
		loading.modal('hide');
		console.log(data);
		var tipoDocTCB=data.codTipoDocumento;
		if(data.getDocumentoDigitalizadoResp!=null){
			bootbox.confirm({
		        size: "large",
		        message: '<iframe src="data:application/pdf;base64,'+data.getDocumentoDigitalizadoResp.documento+'" style="width:100%;height:100%" seamless=""></iframe>',
		        buttons: {
		            confirm: {
		                label: 'Es válida',
		                className: 'btn-success'
		            },
		            cancel: {
		                label: 'No es válida',
		                className: 'btn-danger'
		            }
		        },
		        className: "alertDoc",
		        callback: function (result) {
		            if(result)
		            	validId=true;
		            else{
		            	digitalizacion(tipoDocTCB);
		            }
		        }
		    });
		}
		else{
			bootbox.confirm({
		        size: "large",
		        message: '<div class="alertNoDoc"><h3>No se encontró una identificación con la información ingresada</h3></div>',
		        buttons: {
		            confirm: {
		                label: 'Digitalizar identificación',
		                className: 'btn-primary'
		            },
		            cancel: {
		                label: 'Regresar',
		                className: 'btn-default'
		            }
		        },
		        callback: function (result) {
		        	digitalizacion(tipoDocTCB);
		        }
		    });
		}
	},
	error : function(e) {
		    console.log("Error " + e);
		    loading.modal('hide');
			msjAlerta("Verifique que el número de la cuenta sea correcto.");
			$("#numAcuerdo").val("");
	    }
    });
}

//Funcion para confirmar la validacion de la identificacion.
function confirmarId(){
	alert("si es valida");
}

//Funcion para solicitar la digitalización de la identificacion.
function digitalizacion(tipo){
	bootbox.hideAll();
	var obj = {
			BSFOPERADOR: $("#bsfoperador").val(),
	        idInternoPe: $("#idInternoPe").val(),
	        descDoc: $("#txtTipoIdentificacion").val(),
	        codDoc: tipo,
	        cuenta: $("#noCuenta").val(),
	        alta: "1"
	    };
	$.ajax({
      type: "POST",
      url: window.location.protocol + "//" + window.location.host + "/" + nomPath + "encriptar",
      data: obj,
      success: OnSuccess,
      failure: function (response) {
          bootbox.alert("fallo: " + response.encriptado);
      }
  });
}

//========================================================================================================================================================
//Método para el manejo de la digitalización
//========================================================================================================================================================
function OnSuccess(response){
	$("#ifrmModalDigitaContainerRet").removeClass('hidden');
	$("#digitalizar").removeClass('hidden');
	$("#formBusqueda").addClass('hidden');
	$('#TRANSPORT').val(response.respuesta);
	$('#formDigita').submit();
}

//Método para mostrar opciones de digitalizacion en caso de una consulta de visualización de un documento haya tenido un error.
function mostrarOpcDigitalizar(element){
	bootbox.hideAll();
	console.log(element);
}

//Funcion para realizar la busqueda del nombre del titular de la cuenta.
function getNombre(){
	if($("#numAcuerdo").val().length<1){
		numId=false;
		msjAlerta("Verificar el número de cuenta");
		return;
	}
	
	var datos ={
			"bsfoperador":$("#bsfoperador").val(),
			"acuerdo":$("#numAcuerdo").val()
	}
	$.ajax({
		type : 'POST',
		data : datos,
		url : "./getNombre",
		beforeSend : function() {
		    loading.modal('show');
		},
		success : function(data) {
			loading.modal('hide');
			if(data.nombre!=null){
				numId=true;
			    $("#titCuenta").val(data.nombre);
			    $("#idInternoPe").val(data.idInternoPe);
			}
			else{
				$("#titCuenta").val("");
				$("#idInternoPe").val("");
				numId=false;
				msjAlerta("Hubo un error. Verifique que el número de la cuenta sea correcto.");
			}
		},
		error : function(e) {
				numId=false;
			    console.log("Error " + e);
			    loading.modal('hide');
			    msjAlerta("Verifique que el número de la cuenta sea correcto.");
				$("#numAcuerdo").val("");
		    }
    });
}

//Funcion para pintar la ventana de mensaje emergente.
//PARAM text Variable que contiene la cadena que se mostrara en el mensaje.
function msjAlerta(text) {
    bootbox.alert({
    	message : '<p style="overflow: hidden; float: left; margin-left: 5%;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
		+ '<div class="text-center text-alert"><label>¡Atención!</label><br/>' + '<label>' + text + '</label></div>',
		callback : function() {
	
		}
    });
}


//Funcion para realizar la consulta de la informacion. 
function consultarInformacion(){
	if(numId==false){
		msjAlerta("Verificar el número de cuenta.");
		return;
	}
	if(validId==false){
		msjAlerta("Validar identificación del titular.");
		return;
	}
	loading.modal('show');
	$("#frmBusquedaMovimientosGral").submit();
}

//Función para cancelar la ditalización del documento
function cancelarDigitalizacion(){
	$("#formBusqueda").removeClass('hidden');
	$("#digitalizar").addClass('hidden');
}