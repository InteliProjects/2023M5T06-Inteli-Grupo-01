import { useEffect, useState } from "react";
import SkeletonCreatePage from "../../../components/Skeleton/Create/SkeletonCreatePage.component";
import InputText from "../../../components/UI/Input/Text/InputText.component";
import TextArea from "../../../components/UI/Input/TextArea/TextArea.component";
import PerfilAlunoIcon from "../../../components/UI/SVG/Icons/PerfilAlunoIcon";
import { useNavigate, useParams } from "react-router-dom";
import ompCompetenceService from "../../../services/omp/competence/OmpCompetenceService";
import Swal from "sweetalert2";

export default function CompetenceEditPage () {


    const [competence, setCompetence] = useState<any>('');

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');


    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompCompetenceService.updateById(competence.id,{
                    
                    name: name,
                    description: description,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Competência atualizada com sucesso!',
                }).then(() => {
                    navigator('/competences');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na atualização da competência',
                });
            }
        })();
    }

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (async () => {
            try {
                const competenceInfo = await ompCompetenceService.getById(id as string);
                setCompetence(competenceInfo);

                setDescription(competenceInfo.description);
                setName(competenceInfo.name);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id]);



    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Competência'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <TextArea
                label='Descrição'
                onChange={setDescription}
                value={description}
                required={true}
            />
        </SkeletonCreatePage>
    );
}