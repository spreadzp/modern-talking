 
import { TableData } from "../interfaces/table.interfaces";
import Table from "./Table";

export const SurveyTable: React.FC = () => {
    const offersData: TableData[] = [

    ];
    // for (let i = 3; i <= 15; i++) {
    //     offersData.push({
    //         : i,
    //         name: `Item ${i}`,
    //         uri: `http://example.com/item${i}`,
    //         price: i * 100,
    //         seller: `Seller ${i}`,
    //         nftMetadata: `Metadata for Item ${i}`,
    //     });
    // }
    const handleBuyClick = () => {

    }
    return <Table data={offersData} onBuyClick={handleBuyClick} />;
};