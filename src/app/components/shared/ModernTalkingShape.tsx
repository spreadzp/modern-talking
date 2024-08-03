'use client';
interface ModernTalkingShapeProps {
    type: keyof typeof componentMap;
    d?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    transform?: number[]; // Matrix values: [a, b, c, d, e, f]
    class?: string;
    [key: string]: any; // Allow for additional props
}

const componentMap = {
    path: 'path',
    rect: 'rect',
    circle: 'circle'
} as const;

const ModernTalkingShape: React.FC<ModernTalkingShapeProps> = ({
    type,
    d,
    fill,
    stroke,
    strokeWidth,
    transform,
    class: className,
    ...otherProps
}) => {
    const Component = componentMap[type];

    const transformString = transform ? `matrix(${transform.join(',')})` : '';

    return (
        <Component
            d={d}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transform={transformString}
            {...otherProps}
        />
    );
};

export default ModernTalkingShape;