# Animações de recompensa do NEKOTeach

## Objetivo
Transformar ganhos de Foco e diamantes em uma coleta visual curta, mantendo todas as telas e funcionalidades atuais.

## Implementação
- Criar uma camada global de recompensa que exibe vários ícones de Foco ou diamante no ponto da ação.
- Animar os ícones com uma pequena explosão, movimento suave e voo até o contador correspondente.
- Atualizar visualmente o saldo somente na chegada dos ícones, com pulso discreto no contador.
- Aplicar o efeito à compra de Foco e à coleta de recompensas das missões, incluindo recompensas combinadas.
- Identificar os contadores com alvos estáveis, sem mudar sua posição ou aparência normal.
- Remover a mensagem simples de ganho quando a animação já comunicar Foco/diamantes; manter notificações de Premium, missão, compra e demais ações.
- Corrigir o cartão global de notificação para permanecer reto, alinhado e sem qualquer inclinação durante entrada, exibição ou saída.
- Respeitar a preferência do aparelho por movimento reduzido, usando uma versão curta sem trajetórias longas.

## Validação
- Conferir compra de Foco, ganho de diamantes e recompensa combinada.
- Confirmar que os saldos mudam após a chegada visual da recompensa.
- Verificar notificações retas, alinhadas e responsivas no formato de celular.
- Validar compilação e ausência de erros críticos no navegador.
