import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function StatusSuccessIcon(props: IIcon) {
    return <SVG link='/svg/circle-check.svg' {...props} />;
}
