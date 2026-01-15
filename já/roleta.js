async function girarRoleta() {
    const btn = document.getElementById('btnGirar');
    const box = document.getElementById('rewardBox');
    const roleta = document.getElementById('roleta');
    const raridadeTxt = document.getElementById('raridade');
    const codigoTxt = document.getElementById('codigo');
    
    btn.disabled = true;
    box.style.display = "none";
    roleta.style.transform = "rotate(1800deg)"; // Giro visual

    try {
        const response = await fetch('codigos.json');
        const codigos = await response.json();

        // Cálculo de Probabilidade Real (Peso Acumulado)
        let totalChances = codigos.reduce((sum, item) => sum + item.chance, 0);
        let random = Math.random() * totalChances;
        let selecionado = codigos[0];
        let somaAnterior = 0;

        for (let item of codigos) {
            somaAnterior += item.chance;
            if (random <= somaAnterior) {
                selecionado = item;
                break;
            }
        }

        // Delay para a animação terminar
        setTimeout(() => {
            roleta.style.transform = "rotate(0deg)";
            raridadeTxt.innerText = selecionado.raridade;
            codigoTxt.innerText = selecionado.code;
            
            // Cores por raridade
            const cores = { "Lendário": "#5eead4", "Raro": "#ffd700", "Incomum": "#a855f7", "Comum": "#eaeaea" };
            codigoTxt.style.color = cores[selecionado.raridade] || "#fff";
            
            box.style.display = "block";
            btn.disabled = false;
        }, 3000);

    } catch (e) {
        alert("Erro ao acessar o cofre de códigos.");
        btn.disabled = false;
    }
}

function copiarCodigo() {
    const text = document.getElementById('codigo').innerText;
    navigator.clipboard.writeText(text);
    alert("Código copiado! Use /resgatar no Discord.");
}
