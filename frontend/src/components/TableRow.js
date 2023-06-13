import React from "react";
import TableRowEntry from "./TableRowEntry";
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function TableRow({ record, fillEdit, onDelete, editButton, deleteButton }) {
    return (
        <tr className="table-row">
            {Object.values(record).map((datapoint) => <td>{datapoint}</td>)}
            { editButton === true ? <td>< MdEdit onClick={() => fillEdit(record)} /></td> : <></> }
            { deleteButton === true ? <td>< MdDeleteForever onClick={() => onDelete(record)} /></td> : <></> }
        </tr>
    );
}

export default TableRow;
