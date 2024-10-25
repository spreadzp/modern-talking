# ![mt_resized](https://github.com/spreadzp/modern-talking/assets/11519562/d1c19d08-5d36-421f-a673-8e186a252966) Modern Talking

## Project Overview: Restoring Fair Earnings in the Social Sphere
The **Modern Talking** project is designed to address the imbalance in how value is distributed within the social media ecosystem. Currently, content creators such as bloggers generate income through user engagement—our views, comments, discussions, likes, and other interactions fuel their earnings. However, while they profit, users who contribute their time and engagement typically receive no compensation.

**Modern Talking** seeks to change this by ensuring that every participant is fairly rewarded for their activities. The platform enables advertisers, content creators, researchers, and other stakeholders to offer compensation to users who contribute their valuable time and effort. These activities can include:

**- Engaging in discussions** or providing opinions on various topics,
**- Participating in surveys or polls** to share feedback,
**- Completing advertising-related tasks**, such as viewing ads or completing specific quests,
**- Annotating datasets** for artificial intelligence models.
The platform leverages **keyless Aptos blockchain technology**, allowing every user to have their own blockchain account without the need for private key management. This enables secure and transparent reward distribution in the form of **MDTN tokens**, powered by the **Aptos blockchain**. Users are incentivized to participate in activities, while all interactions and rewards are handled via smart contracts to ensure fairness and transparency.

Through this decentralized approach, **Modern Talking** empowers users to reclaim value for their time and engagement, providing a fairer and more inclusive social ecosystem.

## About Modern Talking

**Modern Talking** is a versatile SocialFi platform designed for user engagement through discussions, voting, surveys, commentaries, and dataset annotations. Participants earn rewards in the form of **MDTN tokens** for their contributions. The platform operates on the **Aptos blockchain** and integrates AI to ensure the integrity and quality of user-generated content. It provides a decentralized ecosystem where participation is rewarded, and user engagement is facilitated through keyless authentication and NFT-based topic ownership.

This system is designed to serve multiple use cases:

- **Topic Discussions**: Facilitate detailed discussions on any topic, with specific controls over who can participate and how contributions are moderated.
- **Voting and Surveys**: Conduct polls and surveys, allowing users to express their opinions and earn rewards for participating.
- **Advertising Campaigns**: Enable advertisers to engage users by viewing ads and completing specific quests or tasks.
- **Dataset Markup for AI Models**: Provide tools to mark up datasets for artificial intelligence models, offering users incentives for participating in data annotation.



## How It Works
The core workflow is as follows:

1. **Authentication**: Users log in through Google authentication, and a keyless Aptos account is created for them.
2. **Topic Creation**: Topic creators can start discussions by creating a topic and minting an **NFT** linked to that topic. This NFT also assigns the owner administrative rights over the discussion's chat.
3. **Airdrop Rules**: The topic creator defines rules for token distribution (airdrop) using **MDTN tokens**.
4. **Rewards Program**: The MTAdmin (Modern Talking Admin) reviews payments and approves the reward distribution program.
5. **User Participation**: Users can comment and engage with the topics, fulfilling conditions for rewards.
6. **Rewards Execution**: Upon completion, the MTAdmin provides the list of eligible users, and the reward program mints MDTN tokens and distributes them to the qualified users' addresses.
7. **AI Moderation**: AI continuously scans comments for relevance and filters out inappropriate content to maintain a healthy discussion environment.

To better understand the workflow, refer to the schema below:

![MTSchema](https://github.com/user-attachments/assets/795e33a8-4242-41d7-9f23-2d3f4575f115) 

### Watch the video 

[![MDTN3](https://github.com/user-attachments/assets/81e11495-a7d0-478f-9e99-a67063c8591c)](https://www.youtube.com/watch?v=13oswGi9eJ4)


## Hosted Application
Try out Modern Talking on the following platforms:
- **[Modern Talking Web App](https://like-to-earn.vercel.app/)**
- **[Telegram mini APP](https://t.me/vote_to_earn_bot)**
 
## Getting Started
To start the development server locally, follow these steps:

1. Clone the repository.
2. Install the required dependencies.
3. Run the development server.

```bash
    git clone https://github.com/spreadzp/modern-talking.git
    cd modern-talking
    npm install 
    npm run dev 
    vercel --prod
```
The application will be available at http://localhost:3000.

## Technologies Used
- **Aptos blockchain**: For secure, decentralized transactions and rewards.
- **Move language**: For writing smart contracts.
- **Keyless Aptos system via Google Auth**: To provide easy user onboarding without the need for private keys.
- **Next.js**: For the Dapp's frontend interface.
- **Postgres**: For database management.
- **Prisma ORM**: To handle database interactions.

## Detailed Functionality

### Blockchain and NFTs

Modern Talking uses the **Aptos blockchain** to ensure secure and transparent transactions. Upon logging in, each user is assigned an Aptos address (keyless, using Google authentication). This address is used to receive **MDTN tokens** as rewards.

When a topic is created, an **NFT** is minted to represent that topic. The owner of the NFT becomes the administrator of the topic’s chat. The NFT is linked to the specific discussion URL and allows for easy management and reward distribution.

### Reward Distribution and Airdrops

Topic creators can define the rules for distributing **MDTN tokens** as rewards to users who participate by commenting or voting on the topic. Once the rules are set, the **MTAdmin** approves the rewards program. The system then automatically executes the reward distribution through smart contracts, minting and transferring MDTN tokens to the eligible users.

### Voting, Surveys, and Ads Quests
- **Voting and Surveys**: The platform allows for flexible voting and survey creation, with rewards distributed to participants based on the defined conditions.
- **Advertising Quests**: Advertisers can launch campaigns where users are required to watch ads or complete specific actions. Upon successful completion, rewards are distributed.

### Dataset Markup for AI
In addition to discussions and voting, the platform supports **dataset markup** tasks for artificial intelligence models. Users can annotate datasets and are rewarded with **MDTN tokens** for their contributions, enabling collaboration on AI training data.

### AI-Powered Moderation

Artificial intelligence is used to analyze comments and ensure that user-generated content is relevant and appropriate. The AI model filters out prohibited words and ensures that discussions are productive and on-topic. This automated moderation provides a clean and safe environment for users to engage with the platform.

## Key Features:

- **SocialFi Integration**: Engaging users with surveys, polls, and comments while offering rewards through blockchain.
- **NFT Ownership**: Each topic created is linked to an NFT, granting administrative rights and facilitating token distribution.
- **AI Content Moderation**: Continuous monitoring and filtering of user-generated content for quality control.
- **MDTN Token Rewards**: Users are rewarded with MDTN tokens for their participation.
- **Decentralized Transactions**: All rewards and transactions are handled securely on the Aptos blockchain.

## Repository Overview

- **UI**: The Next.js-based front-end of the application.
- **Smart Contracts**: Smart contracts, written in Move, deployed on the Aptos blockchain to handle NFT minting, reward distribution, and user verification.
You can find the codebase and additional details in the following repository:
 **[smart-contract repository](https://github.com/spreadzp/mt-aptos-contracts)**

## Keywords
- **Aptos**
- **SocialFi**
- **Blockchain**
- **AI**
- **Surveys**
- **Voting**
- **Comments**
- **Token Rewards**
- **NFTs**
- **Decentralized Applications**

## Next steps
-  **Launch NFT Marketplace**: We will introduce a marketplace for creators to buy, sell, and trade NFTs, allowing content creators to monetize their digital assets within the platform.

- **DeFi Integration**: Next, we will implement a decentralized finance (DeFi) module, enabling users to exchange MDTN tokens for other cryptocurrencies, providing liquidity and utility for the MDTN ecosystem.

- **Smart Contract Audit**: Before the full platform launch, we will conduct a comprehensive audit of all smart contracts to ensure security, functionality, and compliance with industry standards.

- **MDTN Token Sale Preparation**: We will finalize preparations for the initial token sale, offering MDTN to investors, ensuring compliance, and generating early liquidity for the project.

- **AI-Based Message Processing**: Message processing in the platform's chat will be powered by AI text models via API integrations. These models will also analyze chat interactions to verify fulfillment of reward conditions as set by the reward programs.