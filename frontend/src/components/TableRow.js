import React from "react";
import TableRowEntry from "./TableRowEntry";

function TableRow({ datarow }) {
    return (
        <tr className="table-row">
            {datarow.map((datapoint) => <TableRowEntry datapoint={datapoint} />)}
        </tr>
    );
}

export default TableRow;
