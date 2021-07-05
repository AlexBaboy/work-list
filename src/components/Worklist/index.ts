import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { CopyToClipboard } from "../../../components/CopyToClipboard";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationalities";
import { useSelector } from "react-redux";
import { getCurrentContacts } from "../../../components/Selectors";
import {ToggleDataViewMode} from "../ToggleDataViewMode";
import {useDataViewMode} from "../useDataViewMode";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const WorkListTable = () => {

    const classes = useStyles();
    const contactList = useSelector(getCurrentContacts);
    const [dataViewMode, setDataViewMode] = useDataViewMode();
    return (
        <TableContainer component={Paper} data-testid="table-container">

    <ToggleDataViewMode
        dataViewMode={dataViewMode}
    setDataViewMode={setDataViewMode}
    />

    <Table className={classes.table} aria-label="contacts table">
        <TableHead>
            <TableRow>
                <TableCell>{t("contacts.table.headers.avatar")}</TableCell>
    <TableCell>{t("contacts.table.headers.full name")}</TableCell>
    <TableCell>{t("contacts.table.headers.birthday")}</TableCell>
    <TableCell>{t("contacts.table.headers.email")}</TableCell>
    <TableCell>{t("contacts.table.headers.phone")}</TableCell>
    <TableCell>{t("contacts.table.headers.location")}</TableCell>
    <TableCell>{t("contacts.table.headers.nationality")}</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {contactList.map((contact) => (
            <TableRow key={contact.login.uuid}>
            <TableCell component="th" scope="row">
        <Avatar
            alt={
            contact.name.title +
                " " +
                contact.name.first +
                " " +
                contact.name.last
        }
        src={contact.picture.thumbnail}
    />
    </TableCell>
    <TableCell>
    {contact.name.title +
            " " +
            contact.name.first +
            " " +
            contact.name.last}
    </TableCell>
    <TableCell>
    <Typography>
        {format(parseISO(contact.dob.date), "MM/dd/yyyy")}
    </Typography>
    <Typography>{contact.dob.age} years</Typography>
    </TableCell>
    <TableCell>
    <CopyToClipboard text={contact.email} />
    </TableCell>
    <TableCell>
    <CopyToClipboard text={contact.phone} />
    </TableCell>
    <TableCell>
    <CopyToClipboard text={"/" + contact.location.country + "/"} />
    <Typography>
    {contact.location.city}, {contact.location.street.name}{" "}
    {contact.location.street.number}
    </Typography>
    </TableCell>
    <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
    </TableRow>
))}
    </TableBody>
    </Table>
    </TableContainer>
);
};
