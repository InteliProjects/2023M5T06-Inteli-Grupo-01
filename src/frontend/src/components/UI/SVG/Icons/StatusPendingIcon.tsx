import SVG from '../SVG.component';
import IIcon from './IIcon';

export default function StatusPendingIcon(props: IIcon) {
    return <SVG link='/svg/circle-exclamation.svg' {...props} />;
}
