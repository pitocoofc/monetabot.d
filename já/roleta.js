async function iniciarSorteio() {
    const btn = document.getElementById('btnRoll');
    const strip = document.getElementById('strip');
    const rewardDiv = document.getElementById('reward');
    
    // Desabilita botão e esconde resultado anterior
    btn.disabled = true;
    rewardDiv.style.display = "none";
    
    try {
        // Busca o JSON na raiz (../ sobe um nível se o JS estiver na pasta js/)
        // Se o daily.html estiver na raiz, usamos apenas 'codigos.json'
        const response = await fetch('codigos.json');
        if (!response.ok) throw new Error('Falha ao carregar códigos');
        
        const codigos = await response.json();

        // 1. Cálculo de Probabilidade Real
        let totalChances = codigos.reduce((sum, item) => sum + item.chance, 0);
        let randomNum = Math.random() * totalChances;
        let ganhador = codigos[0];
        let soma = 0;

        for (let c of codigos) {
            soma += c.chance;
            if (randomNum <= soma) { 
                ganhador = c; 
                break; 
            }
        }

        // 2. Configuração Visual da "Tira" (Strip)
        const itemWidth = 150; 
        const numItensVisual = 60; // Quantidade de itens para girar bastante
        strip.innerHTML = ""; 
        strip.style.transition = "none";
        strip.style.transform = "translateX(0px)";

        // Criar itens aleatórios para o efeito visual de giro
        for (let i = 0; i < numItensVisual; i++) {
            const tempItem = codigos[Math.floor(Math.random() * codigos.length)];
            const div = document.createElement('div');
            div.className = "rarity-item";
            
            // O item que deve parar no centro (index numItensVisual - 3)
            if (i === numItensVisual - 3) {
                div.innerText = ganhador.raridade;
            } else {
                div.innerText = tempItem.raridade;
            }
            
            div.style.color = getCor(div.innerText);
            strip.appendChild(div);
        }

        // Forçar o navegador a processar o estado antes da animação
        void strip.offsetWidth;

        // 3. Iniciar Animação (5 segundos de giro)
        strip.style.transition = "transform 5s cubic-bezier(0.1, 0, 0.1, 1)";
        
        // Cálculo matemático para centralizar o item ganhador na linha do meio
        const windowWidth = document.querySelector('.roller-window').offsetWidth;
        const finalMove = (numItensVisual - 3) * itemWidth - (windowWidth / 2) + (itemWidth / 2);
        
        strip.style.transform = `translateX(-${finalMove}px)`;

        // 4. Mostrar o código após o término da animação
        setTimeout(() => {
            document.getElementById('raridadeNome').innerText = `RESULTADO: ${ganhador.raridade}`;
            document.getElementById('raridadeNome').style.color = getCor(ganhador.raridade);
            document.getElementById('codigoVal').innerText = ganhador.code;
            rewardDiv.style.display = "block";
            btn.disabled = false;
        }, 5200);

    } catch (e) {
        console.error(e);
        alert("Erro: Certifique-se que o arquivo 'codigos.json' está na raiz do site.");
        btn.disabled = false;
    }
}

function getCor(raridade) {
    const cores = { 
        "Lendário": "#5eead4", 
        "Épico": "#a855f7", 
        "Raro": "#ffd700", 
        "Incomum": "#3b82f6", 
        "Comum": "#94a3b8" 
    };
    return cores[raridade] || "#fff";
}

function copiarCodigo() {
    const txt = document.getElementById('codigoVal').innerText;
    navigator.clipboard.writeText(txt).then(() => {
        alert("Código copiado com sucesso!");
    });
}
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
