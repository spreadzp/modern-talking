import posterImage from './../../../../../assets/poster-1.jpg';
import voteImage from './../../../../../assets/vote.png';
import discussionImage from './../../../../../assets/discussion.png';
import surveyImage from './../../../../../assets/survey.png';
import datasetImage from './../../../../../assets/dataset.png';
import { PosterProps } from './Poster';

const sliderItems: PosterProps[] = [
    {
        title: "Modern Talking",
        imageUrl: posterImage,
        description: "Modern Talking is a web3 application designed to facilitate surveys, voting, commenting on any online resources, dataset annotation for AI models, user engagement monetization, and rewarding the most active users.",
        features: [
            "Empower secure, transparent, and decentralized voting/survey systems.",
            "Incentivized user engagement platforms.",
            "AI dataset annotation and management.",
            "Reliable reward mechanisms using blockchain technology.",
            "Be an Early Adopter: Shape the future of NFTs with cutting-edge technology."
        ],
        callToAction: "Modern Talking and be part of a pioneering SocialFi experience where your voice not only matters but also earns you rewards.",
        joinUrl: "/",
        activeLabel: "Join To"
    },
    {
        title: "Discussions",
        imageUrl: discussionImage,
        description: "Participate in decentralized discussions where your opinions are valued and rewarded. Engage in conversations that matter, and make your voice heard on any topic.",
        features: [
            "Decentralized discussion forums.",
            "Reward mechanisms for active participation.",
            "Secure and private communication channels.",
            "Moderation powered by AI for relevance and appropriateness.",
            "Ownership of discussion data through NFTs."
        ],
        callToAction: "in the conversation and earn rewards for your contributions.",
        joinUrl: "/discussions",
        activeLabel: "Participate"
    },
    {
        title: "Voting",
        imageUrl: voteImage,
        description: "Engage in secure and transparent voting processes on any topic or issue. Your vote matters, and now it can also earn you rewards through blockchain technology.",
        features: [
            "Decentralized and transparent voting systems.",
            "Immutable record of votes on the blockchain.",
            "Reward system for participating in votes.",
            "Customizable voting topics and options.",
            "Integration with NFTs for unique voting rights."
        ],
        callToAction: "your vote and make a difference while earning rewards.",
        joinUrl: "/voting-list",
        activeLabel: "Cast"
    },
    {
        title: "Surveys",
        imageUrl: surveyImage,
        description: "Take part in or create surveys that provide valuable insights while rewarding participants. Contribute to research, opinion polling, and market analysis.",
        features: [
            "Create and participate in decentralized surveys.",
            "Reward systems for survey participants.",
            "Secure data collection and analysis.",
            "Customizable survey templates.",
            "Ownership of survey results through NFTs."
        ],
        callToAction: "in surveys and get rewarded for your opinions.",
        joinUrl: "/surveys",
        activeLabel: "Participate"
    },
    {
        title: "AI Tagging and Dataset Annotation",
        imageUrl: datasetImage,
        description: "Help train AI models by tagging data and annotating datasets. Your contributions are essential for developing smarter AI, and you get rewarded for your efforts.",
        features: [
            "Decentralized AI dataset tagging and annotation.",
            "Reward system for contributing to AI training.",
            "Integration with blockchain for data ownership.",
            "AI-powered quality checks on annotations.",
            "Contribute to the future of AI development."
        ],
        callToAction: "to AI development and earn rewards by tagging and annotating datasets.",
        joinUrl: "/data-sets",
        activeLabel: "Contribute"
    },
];

export default sliderItems;
