
import StarryBackground from '../../shared/StarryBackground';
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
                        <h1 className="title">Modern Talking</h1>
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