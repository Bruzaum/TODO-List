document.querySelector("#btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode")
})

var deletados = new Array();
var naoDeletados = new Array();



const form = document.querySelector("#adicionar-novo-item")
const lista = document.getElementById("lista-itens")
const p = document.querySelector(".item-adicionado")

const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {

    evento.preventDefault()

    const descricao = evento.target.elements['novo-item']

    const existe = itens.find( elemento => elemento.descricao === descricao.value )

    const itemAtual = {
        "descricao": descricao.value
    }

    if (existe) {
        itemAtual.id = existe.id

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id =  itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    descricao.value = ""
})


function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const descricaoItem = document.createElement("p")
    descricaoItem.setAttribute("contenteditable", "true")
    descricaoItem.classList.add("item-adicionado")
    descricaoItem.innerHTML = item.descricao
    descricaoItem.dataset.id = item.id


    novoItem.appendChild(botaoCheckbox(item.id))
    novoItem.appendChild(descricaoItem)
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

    naoDeletados.push(item.id)
}

function botaoCheckbox(id) {

    const inputCheckbox = document.createElement("INPUT")
    inputCheckbox.setAttribute("type", "checkbox")
    inputCheckbox.setAttribute("id", id)
    inputCheckbox.classList.add("box")

    inputCheckbox.addEventListener("change", function() {
        if (this.checked) {
            document.querySelector("[data-id='"+id+"']").style.textDecoration = "line-through"
            document.querySelector("[data-id='"+id+"']").setAttribute("contenteditable", "false")
        }else {
            document.querySelector("[data-id='"+id+"']").style.textDecoration = "none"
            document.querySelector("[data-id='"+id+"']").setAttribute("contenteditable", "true")
        }
    })

    return inputCheckbox
}

function botaoDeleta(id) {

    const botaoDeletar = document.createElement("button")
    botaoDeletar.classList.add("botao-deletar")

    const iconeDeletar = document.createElement("span")
    iconeDeletar.classList.add("material-symbols-outlined")
    iconeDeletar.innerHTML = "delete"

    botaoDeletar.appendChild(iconeDeletar)

    botaoDeletar.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return botaoDeletar
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => (elemento.id) === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
    localStorage.removeItem("id=" + String(id))
    deletados.push(id)

    naoDeletados.splice(naoDeletados.indexOf(id), 1)
}


function save() {	
    for(let i = 0; i <= naoDeletados[naoDeletados.length - 1]; i++){
        if(naoDeletados.includes(i)) {
            var checkbox = document.getElementById(String(i));
        
            localStorage.setItem("id=" + String(i), checkbox.checked);
    
            if (checkbox.checked) {
                document.querySelector("[data-id='"+i+"']").style.textDecoration = "line-through"
                document.querySelector("[data-id='"+i+"']").setAttribute("contenteditable", "false")
            }else {
                document.querySelector("[data-id='"+i+"']").style.textDecoration = "none"
                document.querySelector("[data-id='"+i+"']").setAttribute("contenteditable", "true")
            }
        }
    }
}


for(let i = 0; i <= naoDeletados[naoDeletados.length - 1]; i++){
    if(localStorage.length > 0){
        if(naoDeletados.includes(i)){
            var checked = JSON.parse(localStorage.getItem("id=" + String(i)));
            document.getElementById(String(i)).checked = checked;
        }
    }
}

"change load click touchend".split(" ").forEach(function(e){
    window.addEventListener(e, save);
});

// Tentando salvar no localStorage a atualização do p


function atualizaDescricao(){
    var itensArrayEditados = new Array();
    
    for(let i = 0; i <= naoDeletados[naoDeletados.length - 1]; i++){
        
        if(naoDeletados.includes(i)) {
            const pEditado = document.querySelector("[data-id='"+i+"']")
            const itensEditados = {
                "descricao": pEditado.textContent,
                "id": i
            }
            itensArrayEditados.push(itensEditados)
        }
    }

    localStorage.setItem("itens", JSON.stringify(itensArrayEditados))
}


"change load click mouseover touchstart touchend touchmove touchcancel".split(" ").forEach(function(e){
    window.addEventListener(e, atualizaDescricao);
});
