import Title, { TitleEffect, TitleSize } from "../../shared/Title";
import { StatisticInfo } from "./StatisticInfo";
import Card from "../../shared/Card";

export const Statistic = () => {
    return (
        <Card className="statistic">
            <Title
                titleName="Statistics"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Gradient}
            />

            <StatisticInfo />
        </Card>
    );
}