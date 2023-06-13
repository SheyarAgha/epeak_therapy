import React from "react";
import TableRowEntry from "./TableRowEntry";
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function TableRow({ record, fillEdit, onDelete }) {
    return (
        <tr className="table-row">
            {Object.values(record).map((datapoint) => <td>{datapoint}</td>)}
            <td>< MdEdit onClick={() => fillEdit(record)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(record)} /></td>
        </tr>
    );
}

export default TableRow;
