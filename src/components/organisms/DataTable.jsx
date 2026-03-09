import React from "react";
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
import { Button } from "../ui/button";
import { PlusIcon, Search } from "lucide-react";
import SearchInput from "../molecules/Searchinput";

/**
 * @param {Object[]} columns
 * @param {Object[]} data
 */

export default function DataTable({
  columns = [],
  data = [],
  DataImg,
  Datatitle,
  Search ,
  Create , 
}) {
  if (!columns.length) {
    <p>Columns undefined.</p>;
  }

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="max-h-[calc(100vh-200px)]  bg-transparent overflow-y-auto border rounded-lg mx-3 my-3"
    >
      <div className={"border-2 rounded-lg  border-[#27222CFF] p-5"}>
        <div className="p-4">
          <div
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {DataImg ? <img src={DataImg} alt="" /> : null}
              {Datatitle && <h3 className="text-2xl">{Datatitle}</h3>}
            </div>
            <div className="flex gap-5 items-center">
              {Search ? (
                <SearchInput startIcon={<Search />} className={"h-[30px]"} />
              ) : null}
              {Create ? (
                <Button startIcon={<PlusIcon />} variant={"primary"}>
                  {Create}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <Table className=" border-2 w-full rounded-lg  border-collapse bg-transparent">
          <TableHeader className="sticky  top-0 z-10 bg-transparent shadow-sm ">
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="capitalize font-semibold text-sm border-b text-textColor"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row, index) => {
                return (
                  <TableRow className="text-textColor" key={row.id || index}>
                    {columns.map((col, colIndex) => {
                      return (
                        <TableCell
                          key={col.key || colIndex}
                          className="text-sm "
                        >
                          {col.render
                            ? col.render(row[col.key], row, index)
                            : row[col.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-textColor "
                >
                  Information not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
