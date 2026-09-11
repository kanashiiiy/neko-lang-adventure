# Corrigir conexão e autenticação

## Objetivo
Restabelecer o serviço de login e confirmar que o aplicativo diferencia indisponibilidade do servidor de uma falha de internet do aparelho.

## Implementação
- Manter o serviço hospedado de autenticação e banco ativo e saudável.
- Ajustar somente o tratamento de erros da tela de autenticação para não atribuir automaticamente `Failed to fetch` à internet do usuário.
- Preservar integralmente telas, design, navegação, idiomas e demais funcionalidades.

## Validação
- Confirmar resposta do serviço de autenticação e acesso ao banco.
- Testar login inválido, cadastro com validação e recuperação de senha para comprovar que as requisições chegam ao servidor.
- Verificar restauração de sessão no navegador/app instalado quando existir uma conta válida.

## Observação técnica
O diagnóstico confirmou que o Lovable Cloud estava pausado: o endpoint de autenticação ficou inacessível e retornou erro de rede. Após reativação, o endpoint respondeu normalmente e o banco apresentou estado saudável. Este ambiente atualmente não possui contas cadastradas, portanto não é possível testar uma “conta existente” até haver um cadastro confirmado.
