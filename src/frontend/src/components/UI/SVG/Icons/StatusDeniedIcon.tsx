import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function StatusDeniedIcon(props: IIcon) {
    return <SVG link='/svg/circle-x.svg' {...props} />;
}
