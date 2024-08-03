'use client';
 
enum TitleSize {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
}

enum TitleEffect {
    Zoom = 'zoom',
    Gradient = 'gradient',
}

interface TitleProps {
    titleName: string;
    titleSize: TitleSize;
    titleEffect: TitleEffect;
}

const Title: React.FC<TitleProps> = ({ titleName, titleSize, titleEffect }) => {
    const titleChars = titleName.split('');

    const getTitleSizeClass = (size: TitleSize) => {
        switch (size) {
            case TitleSize.H1:
                return 'text-3xl sm:text-[3rem]';
            case TitleSize.H2:
                return 'text-2xl sm:text-[2.5rem]';
            case TitleSize.H3:
                return 'text-xl sm:text-[2rem]';
            case TitleSize.H4:
                return 'text-lg sm:text-[1.5rem]';
            case TitleSize.H5:
                return 'text-base sm:text-[1.25rem]';
            default:
                return 'text-3xl sm:text-[3rem]';
        }
    };

    const getTitleEffectClass = (effect: TitleEffect) => {
        switch (effect) {
            case TitleEffect.Zoom:
                return 'hover-zoom';
            case TitleEffect.Gradient:
                return 'hover-gradient';
            default:
                return 'hover-zoom';
        }
    };
    return (
        <div className={`font-extrabold tracking-tight ${getTitleSizeClass(titleSize)} mt-5 whitespace-nowrap`}>
            {titleChars.map((char, index) => (
                char === ' ' ? (
                    <span key={index} className="inline-block">&nbsp;</span>
                ) : (
                    <span 
                        key={index} 
                        className={`text-[hsl(187,100%,68%)] ${getTitleEffectClass(titleEffect)}`} 
                        style={{ display: 'inline-block' }}
                    >
                        {char}
                    </span>
                )
            ))}
        </div>
    );
};


export default Title;
export { TitleSize, TitleEffect };