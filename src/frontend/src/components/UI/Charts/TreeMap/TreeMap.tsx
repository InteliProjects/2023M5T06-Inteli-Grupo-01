import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import ITreeMap from './ITreeMap';
import TreeMapCustomTooltip from './TreeMapTooltip/TreeMapCustomTooltip';
import TreeMapCustomContent from './TreeMapCustomContent/TreeMapCustomContent';
import TreeMapLegend from './TreeMapLegend/TreeMapLegend';

const colors = ['#124AED', '#035A50', '#FF4545', '#2E2640', '#FF922B'];

export default function TreeMap(props: ITreeMap) {
    const data = props.data.map((treemapData, index) => {
        return {
            ...treemapData,
            color: colors[index],
        };
    });

    return (
        <div className='flex h-full w-full overflow-auto'>
            <ResponsiveContainer>
                <Treemap
                    data={data}
                    dataKey='size'
                    aspectRatio={6}
                    stroke='#fff'
                    content={<TreeMapCustomContent data={data} />}
                    animationDuration={0}
                >
                    <Tooltip
                        content={
                            <TreeMapCustomTooltip
                                singularItemName={props.singularItemName}
                                pluralItemName={props.pluralItemName}
                            />
                        }
                    />
                </Treemap>
            </ResponsiveContainer>
            <TreeMapLegend {...props} data={data} />
        </div>
    );
}
