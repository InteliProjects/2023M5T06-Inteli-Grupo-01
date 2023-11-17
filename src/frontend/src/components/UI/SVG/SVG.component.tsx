import ISVG from './ISVG.component';

export default function SVG({ link, width, height }: ISVG) {
    return (
        <div style={{ width, height }}>
            <img src={link} style={{ width: width, height: height }} />
        </div>
    );
}
