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

    const splitTitleIntoLines = (title: string, maxLength: number) => {
        const words = title.split(' ');
        let currentLine = '';
        const lines = [];

        for (const word of words) {
            if (currentLine.length + word.length + 1 > maxLength) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                if (currentLine.length > 0) {
                    currentLine += ' ';
                }
                currentLine += word;
            }
        }

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    };

    const titleLines = splitTitleIntoLines(titleName, 45);

    return (
        <div className={`font-extrabold tracking-tight ${getTitleSizeClass(titleSize)} mt-5`}>
            {titleLines.map((line, index) => (
                <div key={index} className={`flex justify-center ${getTitleEffectClass(titleEffect)}`}>
                    {line.split('').map((char, charIndex) => (
                        char === ' ' ? (
                            <span key={charIndex} className="inline-block">&nbsp;</span>
                        ) : (
                            <span 
                                key={charIndex} 
                                className={`text-[hsl(187,100%,68%)] ${getTitleEffectClass(titleEffect)}`} 
                                style={{ display: 'inline-block' }}
                            >
                                {char}
                            </span>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Title;
export { TitleSize, TitleEffect };