export default function TreeMapCustomContent(props: any) {
    let fillColor: string = '';

    if (props.root.color) {
        fillColor = props.root.color;
    }

    if (!fillColor) {
        fillColor = '#5E586B';
    }

    const fontColor = fillColor === '#cccfd1' ? '#000' : '#fff';

    const biggerProp = props.height > props.width ? props.height : props.width;
    const biggerPropsName: 'width' | 'height' =
        props.height > props.width ? 'height' : 'width';

    return (
        <g>
            <rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                style={{
                    fill: fillColor,
                    strokeWidth: 2 / (props.depth + 1e-10),
                    strokeOpacity: 1 / (props.depth + 1e-10),
                }}
            />
            {!props.children && biggerProp >= 100 ? (
                <text
                    x={props.x + props.width / 2}
                    y={props.y + props.height / 2 + 7}
                    textAnchor='middle'
                    fill={fontColor}
                    stroke={fontColor}
                    fontSize={14}
                    transform={
                        biggerPropsName == 'height'
                            ? 'rotate(90, ' +
                              (props.x + props.width / 2) +
                              ', ' +
                              (props.y + props.height / 2) +
                              ')'
                            : ''
                    }
                    className='overflow-auto'
                >
                    {props.name}
                </text>
            ) : null}
            {props.depth === 1 ? (
                <text
                    x={props.x + 4}
                    y={props.y + 18}
                    fill={fontColor}
                    stroke={fontColor}
                    fontSize={16}
                    fillOpacity={0.9}
                >
                    {props.index + 1}
                </text>
            ) : null}
        </g>
    );
}
