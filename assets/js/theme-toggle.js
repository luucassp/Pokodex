/* ─── theme-toggle.js ──────────────────────────────────────────────────────────
   Responsável por:
   1. Ler a preferência salva no localStorage ao carregar a página
   2. Aplicar o tema correto sem flash (antes do primeiro render)
   3. Alternar entre dark e light ao clicar no botão
   4. Salvar a escolha no localStorage para persistir entre recarregamentos
──────────────────────────────────────────────────────────────────────────────── */

const toggleButton = document.getElementById('theme-toggle');
const icon = toggleButton.querySelector('i');

/* ─── 1. Ao carregar a página ──────────────────────────────────────────────────
   localStorage.getItem('theme') retorna:
   - 'dark'  → usuário escolheu dark manualmente
   - 'light' → usuário escolheu light manualmente
   - null    → usuário nunca escolheu, respeita o SO via @media CSS
──────────────────────────────────────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    applyDark();
} else if (savedTheme === 'light') {
    applyLight();
}
/* Se savedTheme for null, o CSS (@media prefers-color-scheme) decide sozinho */

/* ─── 2. Clique no botão ───────────────────────────────────────────────────────
   Verifica o estado ATUAL e vai para o oposto.
──────────────────────────────────────────────────────────────────────────────── */
toggleButton.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        applyLight();
        localStorage.setItem('theme', 'light');
    } else {
        applyDark();
        localStorage.setItem('theme', 'dark');
    }
});

/* ─── Funções auxiliares ───────────────────────────────────────────────────────
   Separar em funções deixa o código mais fácil de ler e reusar.
   Cada função faz UMA coisa: aplica as classes no body e atualiza o ícone.
──────────────────────────────────────────────────────────────────────────────── */
function applyDark() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}

function applyLight() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}