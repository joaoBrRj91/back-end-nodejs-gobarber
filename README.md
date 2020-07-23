## Documentação do projeto - GoBarber - Haircuts Appointments

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar MailTrap para testar envios de emails em ambiente de dev;
- Utilizar Amazon SES para envio de emails em produção;
- O envio de emails deve acontecer em segundo plano (backgraund job);

**RN**

- O link enviado por email, para resetar a senha; deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;
- Deve ser gerado, automaticamente, um token de reset de senha contendo o id do usuário e o token.


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;


**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;


# Painel do prestador(Web App)

**RF**

- O usuário(prestador) deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não-lidas;


**RNF**

- Os agendamentos do prestador, no dia, devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser enviadas em realtime utilizando Socket.IO;


**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviços(Mobile App)

**RF**

- O usuário deve poder listar todos os prestadores de seviço cadastrados;
- O usuário deve poder listar os dias, de um mês, com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador de serviço disponível;


**RNF**

- A listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro agendamento às 8h e o último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
