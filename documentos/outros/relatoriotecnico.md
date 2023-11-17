<h1>Relatório Técnico: Plataforma de Gerenciamento de Turmas e Projetos OMP - One More Project</h1>

**Introdução:** Após identificarmos a principal dificuldade do nosso parceiro em gerenciar turmas, módulos, parceiros e projetos por meio de planilhas de Excel, percebemos a necessidade de uma solução mais eficiente. Estas planilhas tornavam difícil a visualização holística das informações, consequentemente, dificultando a identificação de lacunas e a formulação de insights.

**Solução Proposta:**
Desenvolvemos uma plataforma abrangente que oferece aos usuários a capacidade de executar diversas ações, desde a criação de uma turma até a instituição de um projeto, proporcionando completa autonomia.

# Infográfico Geral

Abaixo está presente um infografico, condensando as informações presentes neste relatório:

![Infografico](/imagens/infografico.png)


## Funcionalidades Principais:

**1. Dashboard Centralizado:** A tela inicial exibe um painel de controle que apresenta os dados cadastrados na plataforma. Essa visão consolidada facilita a identificação de áreas problemáticas, auxilia na priorização de tarefas e otimiza a alocação de recursos.

**2. Sistema de Avaliação:** Introduzimos um sistema de ranking para as iniciativas registradas pelas empresas. Este sistema avalia competências e níveis de expertise requeridos para cada projeto, permitindo que os usuários identifiquem rapidamente as melhores iniciativas.

**3. Acesso à Documentação:** Antecipando a utilização da plataforma por empresas parceiras no futuro, disponibilizamos links diretos para o GitHub. Assim, é possível consultar a documentação de projetos, tanto em andamento quanto finalizados.

## Características do protótipo

**Estrutura do banco de dados:** Tendo em vista as operações que nosso usuário iria executar, optamos por desenvolver um modelo conceitual. Esse modelo nos permitiu validar com o parceiro se o que havíamos proposto estava alinhado com as expectativas do projeto. Além disso, criamos um modelo lógico que facilitou a organização dos nossos dados. Por meio deste, pudemos identificar todos os atributos que nossas tabelas teriam e determinar como as informações seriam unidas para serem apresentadas em nosso frontend. Isso otimizou a criação de nossas queries no banco de dados. Devido a essa estrutura, escolhemos utilizar o MySQL, já que é um banco de dados relacional.
 
**Infraestrutura Técnica:** Implementamos nosso projeto na AWS, usando duas instâncias EC2 ligadas a um banco de dados MySQL. Esta configuração garante 99% de disponibilidade da plataforma. Adicionalmente, nossa Virtual Private Cloud (VPC) consiste em duas sub-redes públicas (uma para frontend e outra para backend) e uma sub-rede privada para o RDS, garantindo segurança dos dados.

**Usabilidade:** Priorizamos uma experiência de usuário intuitiva. Nossa interface é projetada de modo que qualquer atividade possa ser realizada com, no máximo, três cliques, otimizando a eficiência e elevando a eficácia do time de gestão de projetos.

**Personalização e Design:** Todo o frontend foi desenvolvido utilizando react, onde fizemos com que a estética da plataforma refletisse a identidade do nosso parceiro, incorporando ícones e cores alinhados à sua marca.

**Tipos de usuários:** Nossos usuários são formados por pessoas que compõe o escritório de projetos e organizações. Essas do escritório de projetos são aqueles que querem aceitar os melhores parceiros para o Inteli, filtrando boas iniciativas, explicando o modelo da faculdade de forma eficiente para esses possíveis parceiros e tentar automatizar esse processo seletivo para que não fique de forma cansativa.
Já os parceiros, são aqueles que queiram se inscrever para participar da seleção para se tornarem futuros parceiros do Inteli.

## Testes da Platarforma

**Testes de Usabilidade:** Considerando que nosso parceiro é a própria faculdade, tivemos a oportunidade de envolver diretamente os futuros usuários da plataforma no processo de teste. Desenvolvemos, então, métricas específicas para avaliar o comportamento do usuário em nossa aplicação. Para garantir uma avaliação eficaz, estabelecemos atividades específicas que os testadores deveriam realizar, o que influenciou diretamente nas métricas avaliadas. Esses procedimentos nos permitiram avaliar vários requisitos de usabilidade que havíamos definido, tais como operabilidade, resiliência a erros, estética da interface, facilidade de aprendizado e adequação às necessidades. Como resultado, pudemos identificar e corrigir falhas na aplicação, otimizando assim o fluxo de trabalho da plataforma.

**Testes de Integração:** Realizamos testes de integração para confirmar que as requisições de listagem e algumas consultas de criação específicas da nossa plataforma estavam sendo executadas conforme o previsto. Para facilitar esse processo, inserimos registros de logs em todas as interações com o backend e queries no banco de dados. Esta estratégia nos permitiu, ao longo do desenvolvimento, detectar falhas em várias partes da nossa plataforma - desde chamadas no frontend até operações (select, insert, update, delete) no banco de dados. Com essa abordagem, asseguramos uma integração de ponta a ponta eficaz, resultando em uma plataforma totalmente funcional.
