import { StatisticInfo } from "./StatisticInfo";

export const Statistic = () => {
    return (
        <div className="statistic p-4 bg-white bg-opacity-20 text-white">
            <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
                <span className="text-[hsl(187,100%,68%)]">
                    Modern Talking Statistic
                </span>{" "}
                
            </h3>
            <StatisticInfo />
        </div>
    );
}