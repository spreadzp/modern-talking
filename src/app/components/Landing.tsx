
import posterImage from './../../../assets/poster-1.jpg';
import Collaboration from './Collaboration';
import Poster from './Poster';
import { Statistic } from './Statistic';

const Landing: React.FC = () => {
    return (<div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
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
    );
};

export default Landing;