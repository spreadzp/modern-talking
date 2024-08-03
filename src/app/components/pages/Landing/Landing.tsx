
import StarryBackground from '../../shared/StarryBackground';
import Title, { TitleEffect, TitleSize } from '../../shared/Title';
import posterImage from './../../../../../assets/poster-1.jpg';
import Collaboration from './Collaboration';
import Poster from './Poster';
import { Statistic } from './Statistic';

const Landing: React.FC = () => {
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen  ">
                <div className="container mx-auto p-4">
                    <div className="landing">
                   
                        
                        {/* <ImageSlider /> */}
                        <Poster
                            title="Modern Talking"
                            imageUrl={posterImage}
                        />
                        <Statistic />
                        <Collaboration />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Landing;