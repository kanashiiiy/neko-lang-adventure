# Correção definitiva dos Diálogos do Dia a Dia

## Objetivo

Corrigir somente a fonte de dados e a associação das frases, preservando integralmente a interface, a navegação, os botões, o áudio, os favoritos e a tela de detalhes atuais.

## Implementação

1. **Trocar a associação implícita por dados explícitos**
   - Remover a montagem atual que escolhe uma resposta e completa o detalhe com as duas primeiras frases restantes da categoria.
   - Cada opção passará a possuir diretamente seu próprio conjunto de três falas de exemplo.
   - Cada fala interna terá ID próprio e textos correspondentes em português, inglês e japonês, além de romanização japonesa.

2. **Refazer os exemplos de todas as opções**
   - Manter as 20 categorias e as opções principais existentes.
   - Criar três falas naturais e específicas para cada opção, sem reaproveitar objetos, listas ou textos entre opções e categorias.
   - Fazer os exemplos continuarem a situação da frase selecionada, em vez de buscar frases genéricas na categoria.

3. **Atualizar somente a leitura dos detalhes**
   - A tela continuará igual, mas a seção “Exemplo em diálogo” lerá exclusivamente as três falas vinculadas à opção selecionada.
   - Áudio, tradução, romanização, prática e favoritos continuarão usando o idioma estudado e o idioma da interface como hoje.

4. **Validar toda a base**
   - Verificar IDs únicos para categorias, opções e falas internas.
   - Verificar que cada opção possui exatamente três falas e uma lista própria.
   - Comparar textos em português, inglês, japonês e romanização para impedir duplicatas entre quaisquer opções ou categorias.
   - Confirmar no aplicativo que opções diferentes mostram conjuntos diferentes e que o projeto continua sem erros.

## Arquivos envolvidos

- `src/lib/dialogs.ts`: novo modelo explícito e conteúdo exclusivo.
- `src/components/DailyDialogs.tsx`: leitura das três falas da própria opção, sem alterar o visual.