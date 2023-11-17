import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function EditIcon(props: IIcon) {
    return <SVG link='/svg/clipbord.svg' {...props} />;
}
