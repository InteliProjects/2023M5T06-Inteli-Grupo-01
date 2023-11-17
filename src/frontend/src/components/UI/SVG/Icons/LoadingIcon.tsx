import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function LoadingIcon(props: IIcon) {
    return <SVG link='/svg/respira.svg' {...props} />;
}
