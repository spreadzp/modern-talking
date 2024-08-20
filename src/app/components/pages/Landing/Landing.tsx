'use client';
import StarryBackground from '../../shared/StarryBackground';
import Collaboration from './Collaboration';
import { Statistic } from './Statistic';
import FeatureSlider from './FeatureSlider';
import sliderItems from './sliderItems';

const Landing: React.FC = () => {
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen">
                <div className="container mx-auto p-4">
                    <div className="landing">
                        <FeatureSlider items={sliderItems} />
                        <div className="mt-8"></div>
                        <Statistic />
                        <Collaboration />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;