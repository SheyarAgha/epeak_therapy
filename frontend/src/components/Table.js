import React from "react";
import TableRow from "./TableRow";

function Table({ data }) {
    return (
        <table className="table">
            <thead>
            </thead>
            <tbody>
                {data.map((datarow) => <TableRow datarow={datarow} />)}
            </tbody>
        </table>
    );
}

export default Table;
