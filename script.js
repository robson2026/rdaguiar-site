// ... dentro do seu script.js ...

let fuse; // Variável para o motor de busca

// Quando os produtos carregarem, inicializamos o Fuse
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        todosProdutos = data;
        renderizarVitrine(data);

        // Configuração do Fuse.js
        const options = {
            keys: ['nome'], // O que o Fuse deve pesquisar
            threshold: 0.3  // 0 é exato, 1 é muito permissivo. 0.3 é ideal.
        };
        fuse = new Fuse(data, options);
    });

// Atualização da lógica de busca
campoBusca.addEventListener('input', (e) => {
    const termo = e.target.value;
    if (termo.length === 0) {
        renderizarVitrine(todosProdutos);
        return;
    }
    const resultados = fuse.search(termo);
    // Transforma o formato do Fuse no formato que o renderizarVitrine espera
    const listaFiltrada = resultados.map(r => r.item);
    renderizarVitrine(listaFiltrada);
});
