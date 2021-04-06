function showCadastro() {
	$("form#form input").val("");
    var x = document.getElementById("formCadastro");
	var y = document.getElementById("listarCadastro");
	var z = document.getElementById("btnAtualizaCadastro");
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
	
	//função para editar cadastro da lista
	function editaCadastro(id){
			$.ajax({
				method: "GET",
				url: "https://estagio.eficazmarketing.com/api/user/"+id,			
			})
			.done(function (cadastro)
			{
				$("[name=id]").val(cadastro.id);	
				$("#emailPessoal").val(cadastro.seu_email);
				$("#nomeCadastro").val(cadastro.nome);
				$("#emailCadastro").val(cadastro.email);
				$("#telefoneCadastro").val(cadastro.telefone);
				$("#logradouroCadastro").val(cadastro.rua);
				$("#numeroCadastro").val(cadastro.numero);
				$("#complementoCadastro").val(cadastro.complemento);
				$("#bairroCadastro").val(cadastro.bairro);
				$("#cidadeCadastro").val(cadastro.cidade);
				$("#cepCadastro").val(cadastro.cep);
				$("#ufCadastro").val(cadastro.uf)

			})
			
			

			//Mudança de Visibilidade das janelas e botões
			var a = document.getElementById("formCadastro");
			var b = document.getElementById("submitCadastro");
			var c = document.getElementById("btnAtualizaCadastro");
			var d = document.getElementById("listarCadastro");
			a.style.display = "flex";
			b.style.display = "none";
			d.style.display = "none";
			c.style.display = "flex";
	}

	window.atualizaCadastro = function()
	{
		// Colocar informações na tela
		var id = $("[name=id]").val();
		$.ajax({
			method: "PUT",
			url: "https://estagio.eficazmarketing.com/api/user/"+id,
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
			},

			success: function(retorno) {
				alert(retorno.message);
				location.reload();
			}	
		})
	}
