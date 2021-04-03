function showHideElement(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }


  function removeCadastro(id){
		if(confirm("Deseja realmente excluir o cadastro?")){
			$.ajax({
				url: 'https://estagio.eficazmarketing.com/api/user/'+id,
				type: 'DELETE',
			});
		}
	}
	function editaCadastro(id){
		window.sessionStorage.clear();
		window.sessionStorage.setItem("idEficaz",id);
		window.location.assign("index.html");
	}
