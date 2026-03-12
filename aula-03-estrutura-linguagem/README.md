# Aula 03 — Estrutura e Linguagem

**Disciplina:** Programação para Dispositivos Móveis  
**Professor:** Marcio Goes do Nascimento  
**Turma:** TADS 2026.1  
**Data:** 26 de Fevereiro de 2025  

---

## Objetivos da Aula

- Dominar a sintaxe moderna do JavaScript (ES6+)
- Entender diferenças entre `var`, `let` e `const`
- Escrever e usar funções arrow, closures e parâmetros avançados
- Aplicar destructuring, spread/rest e template strings
- Trabalhar com programação assíncrona (Promises, async/await, fetch)
- Introduzir TypeScript: tipos, interfaces, generics e props tipadas
- Escrever JSX com expressões, renderização condicional e listas

---

## Estrutura dos Exemplos

| # | Pasta | Arquivo | Conceitos Abordados |
|---|-------|---------|---------------------|
| 01 | `exemplo-01-variaveis-tipos` | `App.js` | `var`/`let`/`const`, hoisting, tipos primitivos e de referência, `typeof` |
| 02 | `exemplo-02-funcoes-arrow` | `App.js` | Function declaration, expression, arrow functions, default params, rest params, closures |
| 03 | `exemplo-03-es6-moderno` | `App.js` | Destructuring, spread, `.map()`, `.filter()`, `.reduce()`, optional chaining, nullish coalescing |
| 04 | `exemplo-04-async-await` | `App.js` | Callbacks vs Promises vs async/await, fetch, try/catch/finally, consumo de API real |
| 05 | `exemplo-05-typescript-basico` | `App.tsx` | Tipos primitivos, union types, interfaces, type alias, generics, props tipadas |
| 06 | `exemplo-06-jsx-listas` | `App.js` | Expressões `{ }`, renderização condicional (`? :` e `&&`), `.map()`, FlatList, Switch |
| 07 | `exemplo-07-exercicio-gabarito` | `App.js` | **Gabarito completo** integrando todos os conceitos da aula |

---

## Como Testar

### Opção 1 — Snack Expo (mais rápido, sem instalar nada)

1. Acesse [snack.expo.dev](https://snack.expo.dev)
2. Abra o arquivo `App.js` do exemplo desejado desta pasta
3. Copie todo o conteúdo e cole no editor do Snack
4. Escaneie o QR Code com o **Expo Go** no celular

> ⚠️ Para o Exemplo 05 (TypeScript), renomeie o arquivo para `App.tsx` no Snack.

### Opção 2 — Rodar localmente

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/marciogoes/auladm.git
cd auladm/aula-03-estrutura-linguagem/exemplo-07-exercicio-gabarito

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

---

## Roteiro Sugerido para a Aula

### Parte 1 — Módulos 01 a 03 (~60 min)

| Slides | Exemplo | Atividade |
|--------|---------|-----------|
| Módulo 01: Por que JS? | — | Apresentação + discussão |
| Módulo 02: Fundamentos | `exemplo-01-variaveis-tipos` | Demonstrar acordeão interativo, explorar typeof |
| Módulo 02: Funções | `exemplo-02-funcoes-arrow` | Calculadora ao vivo, demonstrar closures |
| Módulo 03: ES6+ | `exemplo-03-es6-moderno` | Filtros ao vivo, explorar abas de métodos |

### Parte 2 — Módulos 04 a 06 (~60 min)

| Slides | Exemplo | Atividade |
|--------|---------|-----------|
| Módulo 04: Async | `exemplo-04-async-await` | Demo de timing assíncrono, buscar usuário ao vivo |
| Módulo 05: TypeScript | `exemplo-05-typescript-basico` | Renomear App.tsx, explorar inferência de tipos |
| Módulo 06: JSX | `exemplo-06-jsx-listas` | Toggle map/FlatList, favoritar itens |

### Parte 3 — Exercício (~60 min)

1. Apresentar o enunciado (slide Módulo 07)
2. Alunos resolvem em duplas no snack.expo.dev (~30 min)
3. Correção coletiva usando `exemplo-07-exercicio-gabarito`

---

## APIs Usadas nos Exemplos

| Exemplo | API | Endpoint | Necessita Auth? |
|---------|-----|----------|-----------------|
| 04 | JSONPlaceholder | `GET /users/:id` | Não |
| 04 | JSONPlaceholder | `GET /posts?userId=:id` | Não |
| 07 | JSONPlaceholder | `GET /users` | Não |

> [JSONPlaceholder](https://jsonplaceholder.typicode.com) é uma API gratuita para testes — ideal para fins pedagógicos.

---

## Conceitos-Chave da Aula

```javascript
// 1. const/let
const FIXO = 'não muda';    // use como padrão
let contador = 0;           // use quando o valor muda

// 2. Arrow function
const dobrar = (n) => n * 2;

// 3. Destructuring
const { nome, curso } = aluno;
const [primeiro, ...resto] = lista;

// 4. Spread
const novoAluno = { ...alunoBase, curso: 'TADS' };

// 5. Métodos de array
lista.map(item => ...)        // transforma
lista.filter(item => ...)     // filtra
lista.reduce((acc, item) => ..., inicial) // acumula

// 6. Async/Await
const buscar = async () => {
  try {
    const res = await fetch(url);
    const dados = await res.json();
  } catch (e) {
    console.error(e);
  }
};

// 7. TypeScript — interface
interface Aluno {
  id: number;
  nome: string;
  notas: number[];
}
```

---

## Pré-requisitos dos Alunos

- App **Expo Go** instalado no smartphone
- Ambiente de desenvolvimento configurado (Aula 02)
- Conhecimento básico de lógica de programação

---

## Para a Próxima Aula (04 — Interface de Usuário I)

- [ ] Resolver o exercício do gabarito sem olhar a resposta
- [ ] Ler: [reactnative.dev/docs/view](https://reactnative.dev/docs/view)
- [ ] Ler: [reactnative.dev/docs/text](https://reactnative.dev/docs/text)
- [ ] Assistir: "React Native Layout with Flexbox" (canal oficial RN no YouTube)

---

## Referências

- [MDN — JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info) — tutorial moderno e completo
- [TypeScript Handbook](https://typescriptlang.org/docs/handbook/intro.html)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — API gratuita para testes
