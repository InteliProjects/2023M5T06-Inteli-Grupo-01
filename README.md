# <a href= "https://www.inteli.edu.br/"><img src="/imagens/logointeli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a> Instituto de Tecnologia e Liderança 

# One more project


## Maroon 5

## :student: Integrantes: 
- <a href="https://www.linkedin.com/in/israel-carvalho-706133241/">Israel Carvalho</a> 
- <a href="https://www.linkedin.com/in/jos%C3%A9-vitor-marcelino-4165ba24a/">José Vitor Marcelino</a>
- <a href="https://www.linkedin.com/in/lfcovas97/">Luiz Fernando Covas</a>
- <a href="https://www.linkedin.com/in/rafael-techio/">Rafael Mateus Zimmer Techio</a> 
- <a href="">Isabela Rocha</a>


## :teacher: Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/vanunes/">Vanessa Nunes</a>
### Instrutores
- <a href="https://www.linkedin.com/in/jose-romualdo/">Programação - José Romualdo</a>
- Matemática e Física - Geraldo Vasconcelos
- <a href="https://www.linkedin.com/in/lisane-valdo/">Negócios - Lisane Valdo</a>
- <a href="https://www.linkedin.com/in/gui-cestari/">Design - Guilherme Henrique de Oliveira Cestari</a> 
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Liderança - Filipe Gonçalves</a>

## 📝 Descrição

Curta descrição sobre o que o seu projeto faz (problema a ser resolvido e solução proposta - máx. 250 palavras - deve conter link para vídeo de demonstração - pode conter imagens).

## 📝 LINKS

<a href="https://github.com/2023M5T06-Inteli/Grupo-01/blob/main/documentos/index.md">Link para a documentação geral</a> do projeto.

## 📁 Estrutura de pastas

|--> documentos<br>
  &emsp;| --> outros
    &emsp;&emsp;| --> scripts_1.0 <br>
    &emsp;&emsp;| relatoriotecnico.md <br>
    &emsp;&emsp;| img <br>
  &emsp;| index.md <br>
|--> src<br>
  &emsp;|--> backend<br>
  &emsp;|--> frontend<br>
| README.md<br>

Dentre os arquivos e pastas presentes, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto.

- <b>documentos/outros/img</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>documentos/index.md</b>: Documentação detalhada do projeto.
 
- <b>documentos/outros/scripts_1.0</b>: Scripts do projeto como criação de banco de dados.

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (circuito e eventuais sistemas complementares).

- <b>src/backend</b>: nesta pasta encontra-se todo o código fonte do backend em node js.

- <b>src/backend</b>: nesta pasta encontra-se todo o código fonte do frontend em react js.  

## 💻 Configuração para desenvolvimento

Usamos o Docker para criar os containers do projeto. Para isso, siga os passos abaixo:

Na pasta src/backend, crie um arquivo chamado .env e insira as variáveis de ambiente necessárias. Utilize a seguinte nomenclatura:
```
PORT=""
DATABASE=""
DATABASE_USER=""
DATABASE_HOST=""
DATABASE_PORT=""
DATABASE_PASSWORD=""
```
Lembrando que as variáveis pondem apontar para um banco de dados local ou um deploy. O arquivo .sql de criação das tabelas necessárias estão no caminho: /documentos/outros/scripts_1.0/modelo-fisico.sql.

O projeto é composto por um backend em node.js e um frontend em react.js. Para executá-los, use o docker ou então instale a última versão com suporte do node.js no ambiente de execução e siga as instruções a seguir:

Docker: 

Vá até a pasta backend e em seguida, execute o comando abaixo para subir o container Docker (caso optar pelo uso do Docker):

```
docker-compose up --build -d
```

Agora, vá para a pasta src/frontend e abra o arquivo /src/services/omp/Omp.service.ts. Edite o construtor da classe, substituindo o link base da API que está configurado por padrão para acessar localhost:3000.

Novamente, rode o comando a seguir para subir o container:
```
docker-compose up --build -d
```

Caso optar pela execução manual:
Vá até a pasta src/backend e execute o comando
```
npm run dev
```

Agora, vá para a pasta src/frontend e abra o arquivo /src/services/omp/Omp.service.ts. Edite o construtor da classe, substituindo o link base da API que está configurado por padrão para acessar localhost:3000.

Novamente, rode o comando a seguir para iniciar a aplicação:
```
npm run dev
```

## 🗃 Histórico de lançamentos

* 0.0.1 - 11/08/2023
    * Espeficiação de requisítos e descrição de testes de requisitos
    * Criação de Persona, mapa de jornada de usuário e wireframe
    * Diagrama de casos de uso e implementação UML
    * Contexto da indústria do parceiro
    * Análise SWOT
* 0.2.0 - 25/08/2023
    * Backend 0.1 mockado em núvem 
    * Tecnologias e ferramentas do backend
    * Descrição de deploy do backend mockado
    * Referência API
    * Diagrama de sequência UML
    * Frontend 0.2 em núvem
    * Demonstração de integrações
* 0.3.0 - 06/09/2023
    * Modelagem de dados
    * Backend integrado ao banco de dados
    * Registro de testes de integração
    * Backend 0.2
    * Frontend 0.2
* 0.4.0 - 22/09/2023
    * Refatoração de Testes
    * Testes automatizados
    * Testes de requisitos não funcionais
    * Testes de usabilidade
    * Backend 0.3
    * Frontend 0.3
* 1.0.0 - 06/10/2023
    * Relatório Técnico no projeot
    * Refatoração final
    * Referência API final
    * Backend 1.0
    * Frontend 1.0

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M4/">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Isabela Rocha, Israel Carvalho, José Vitor Marcelino, Luiz Fernando Covas, Rafael Techio </a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

