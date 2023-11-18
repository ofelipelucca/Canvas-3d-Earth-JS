# Glabo, a Terra em 3D

Este projeto utiliza a biblioteca Three.js para criar uma simulação interativa da Terra em um ambiente de estrelas. Os usuários podem interagir com a cena movendo a Terra com o mouse.

## Estrutura do Código

O código JavaScript cria uma cena 3D composta por uma esfera representando a Terra e um ambiente estelar ao redor. A interação do usuário permite girar a Terra em torno de seu eixo usando o mouse.

- **Cena, Câmera e Luz:** Criação da cena, câmera e luz para a simulação 3D.
- **Texturas:** Carrega texturas para a Terra e o céu.
- **Esferas:** Criação das esferas para representar a Terra e o céu estelar.
- **Event Listeners:** Captura eventos do mouse para permitir a interação do usuário.
- **Renderizador:** Configuração do renderizador WebGL e ajuste dinâmico do tamanho da janela.
- **Função de Animação:** Inicia a animação, atualizando a renderização da cena.

## Uso

1. Abra o arquivo `index.html` em um navegador.
2. Interaja com a cena movendo o mouse para girar a Terra.
3. Observe a simulação interativa da Terra no espaço.

## Autor

Felipe Lucca Taumaturgo de Oliveira