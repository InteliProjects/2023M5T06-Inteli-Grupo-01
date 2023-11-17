## Critério de ordem de criação

Durante o processo de criação das tabelas pensamos em qual critério seguir para iniciar a criação delas e por qual delas começar.

Considerando que nosso projeto utiliza chaves estrangeiras, definimos que a melhor estratégia seria começar a criação de tabela pelas "tabelas pais", para garantir a integridade referencial do nosso banco de dados. Além disso, também levamos em conta a dependência entre tabelas, então tabelas com informações mais independentes foram criadas primeiro.

### Ordem das tabelas

1. omp_competence
1. omp_course
1. omp_file
1. omp_teacher
1. omp_user
1. omp_company
1. omp_module
1. omp_module_competence
1. omp_class
1. omp_initiative
1. omp_initiative_competence
1. omp_project
1. omp_project_competence
1. omp_project_teacher
1. omp_prototype
