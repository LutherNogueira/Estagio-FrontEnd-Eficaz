function showCadastro() {
    var x = document.getElementById("formCadastro");
	var y = document.getElementById("listarCadastro");
	var z = document.getElementById("atualizaCadastro");
	var a = document.getElementById("submitCadastro");
	y.style.display = "none";
    if (x.style.display === "none") {
		y.style.display = "none";
		z.style.display = "none";
		a.style.display = "flex";
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  function showLista() {
    var x = document.getElementById("listarCadastro");
	var y = document.getElementById("formCadastro");
    if (x.style.display === "none") {
		y.style.display = "none";
      	x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }


	function editaCadastro(id){
		window.sessionStorage.clear();
		window.sessionStorage.setItem("idEficaz",id);
		window.location.assign("index.html");
	}


    $("#telefoneCadastro").mask("(00)00000-0000");
    $("#cepCadastro").mask("00000-000");

    $(document).ready(function(){
        function buscaUsuariosCadastrados(){
            $.ajax({
                url: "https://estagio.eficazmarketing.com/api/user",
                type: "GET",
                data: []
            }).done(function(result) {
                $.each(result, function(index, usuario){
                    let idusuario = usuario.id;

                    let tr = '<tr id="usuario_' + idusuario + '">';
                    
                    tr += '<td id="' + idusuario + '" data-nome="' + usuario.nome + '">' + usuario.nome + '</td>';
                    tr += '<td id="' + idusuario + '" data-email="' + usuario.email + '">' + usuario.email + '</td>';
                    tr += '<td id="' + idusuario + '" data-endereco="' + usuario.cep+usuario.numero + '">' + usuario.rua +", "+usuario.numero+ '<br>'+usuario.bairro+'<br>'+usuario.cep+'<br>'+usuario.cidade+'-'+usuario.uf+'</td>';
                    tr += '<td id="' + idusuario + '" data-telefone="' + usuario.telefone + '">' + usuario.telefone + '</td>';

                    tr += '<td style="width:10%">';

                    tr += '<button type="button" class="btn btn-success btEditar" id="btEditar_' + idusuario + '" onclick="editaCadastro('+idusuario+')">Editar</button><br/>';
                    tr += '<button type="button" class="btn btn-danger btExcluir" id="btExcluir_' + idusuario + '" onclick="removeCadastro('+idusuario+')">Excluir</button>';

                    tr += '</td>';
                    tr += '</tr>';

                    $("#table-lista-cadastrados > tbody").append(tr);

                });
            });
        }

        buscaUsuariosCadastrados();
    });


//função para deletar cadastro da lista
function removeCadastro(id){
	if (confirm("Deseja deletar o usuário informado?")){
		$.ajax({
			method: "DELETE",
			url: "https://estagio.eficazmarketing.com/api/user/"+id,
			
			success: function(retorno) {
				alert("Usuário deletado com Sucesso!");
				location.reload();
			}	
		});
		
	}
}


	//função para registrar cadastro na API
	function enviaCadstro(){
		$("#form").submit(function(e){
			$.ajax({
				method: "POST",
				url: "https://estagio.eficazmarketing.com/api/user",
				data: {
					seu_email: $("#emailPessoal").val(),
					nome: $("#nomeCadastro").val(),
					email: $("#emailCadastro").val(),
					telefone: $("#telefoneCadastro").val(),
					rua: $("#logradouroCadastro").val(),
					numero: $("#numeroCadastro").val(),
					complemento: $("#complementoCadastro").val(),
					bairro: $("#bairroCadastro").val(),
					cidade: $("#cidadeCadastro").val(),
					cep: $("#cepCadastro").val(),
					uf: $("#ufCadastro").val()
				}
			})
	
			return true;
		});
	}
	
	//função para editar cadastro da lista - incompleta, ainda não consegue jogar os dados no formulário (put nao funcionando)
	function editaCadastro(id){
			$.ajax({
				method: "GET",
				url: "https://estagio.eficazmarketing.com/api/user/"+id,
				data:{
					seu_email: $("#emailPessoal").val(),
					nome: $("#nomeCadastro").val(),
					email: $("#emailCadastro").val(),
					telefone: $("#telefoneCadastro").val(),
					rua: $("#logradouroCadastro").val(),
					numero: $("#numeroCadastro").val(),
					complemento: $("#complementoCadastro").val(),
					bairro: $("#bairroCadastro").val(),
					cidade: $("#cidadeCadastro").val(),
					cep: $("#cepCadastro").val(),
					uf: $("#ufCadastro").val()
				}
			})
			
			//Mudança de Visibilidade das janelas e botões
			var a = document.getElementById("formCadastro");
			var b = document.getElementById("submitCadastro");
			var c = document.getElementById("atualizaCadastro");
			var d = document.getElementById("listarCadastro");
			a.style.display = "flex";
			b.style.display = "none";
			d.style.display = "none";
			c.style.display = "flex";
			
			// Colocar informações na tela
			$.ajax({
				method: "PUT",
				url: "https://estagio.eficazmarketing.com/api/user/"+id,
				data: {
					'emailPessoal': $("#emailPessoal").val(id),
					"nomeCadastro": $("#nomeCadastro").val(),
					"#emailCadastro": $("#emailCadastro").val(),
					"#telefoneCadastro": $("#telefoneCadastro").val(),
					"#logradouroCadastro": $("#logradouroCadastro").val(),
					"#numeroCadastro": $("#numeroCadastro").val(),
					"#complemento": $("#complementoCadastro").val(),
					"#complementoCadastro": $("#bairroCadastro").val(),
					"#cidadeCadastro": $("#cidadeCadastro").val(),
					"#cepCadastro": $("#cepCadastro").val(),
					"#ufCadastro": $("#ufCadastro").val()
				},
			})
	}