import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
// Types
import { DiaryEntry } from "../../utils/types";

interface EntriesProps {
    entries: DiaryEntry[];
}

const Entries = ({ entries }: EntriesProps) => {
    const entryKeys: string[] = Object.keys(entries[0]).filter(
        (key) => key !== "id"
    );

    const totalFlights = entries.length;
    return (
        <Table>
            <TableCaption>A list of recent flights.</TableCaption>
            <TableHeader>
                <TableRow className="bg-slate-300/50 ">
                    {entryKeys.map((key) => (
                        <TableHead
                            key={key}
                            className="text-zinc-900 capitalize font-bold"
                        >
                            {key}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id}>
                        <TableCell className="font-medium">
                            {entry.date}
                        </TableCell>
                        <TableCell>{entry.weather}</TableCell>
                        <TableCell>{entry.visibility}</TableCell>
                        <TableCell>{entry.comment}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Flights</TableCell>
                    <TableCell className="text-right">{totalFlights}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default Entries;
