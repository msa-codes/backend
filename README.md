# Recuperação de senha

**RF**

- O usuário de poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário de poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2hs horas;
- O usuário precisar confirmar a nova senha ao resetar sua senha.

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

-


**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve precisa confirmar a nova senha;

# Painel de prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificaçoẽs do prestador devem ser armazenadas no MongoDB;
- As notificaçoẽs do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador tenha controle;


# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h hora;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, Último às 17h);
- O usuário não deve poder agendar em um horário já ocupado;
- O usuário não deve poder agendar em um horário que já passou;


