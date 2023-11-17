import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function CheckIcon(props: IIcon) {
    return <SVG link='/svg/check.svg' {...props} />;
}
