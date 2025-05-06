import {
    createColumnHelper
} from "@tanstack/react-table";
import { TEmails } from "./types";
const columnHelper = createColumnHelper<TEmails>();

const columns = [
    {
        header: "From ",
        accessorKey: "warranty",
    },
];
export default columns