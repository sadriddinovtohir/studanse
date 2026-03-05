import DataTable from "@/components/organisms/DataTable";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const headerData = [
    {
      title: "Manage Admins",
      button: "ADD",
      input: "search",
    },
  ];
  const data = [
    {
      name: "lorem",
      age: 30,
      surname: "loremov",
    },
    {
      name: "loasdfasdfasdfrem",
      age: 40,
      surname: "loasdfasdfremov",
    },
    {
      name: "loradfasdfem",
      age: 20,
      surname: "lorasdfasdfasdfaemov",
    },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    {
      key: "surname",
      label: "Surname",
      render: () => <Button variant={"primary"}>lorem</Button>,
    },
  ];
  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} headerData={headerData} />
    </div>
  );
}
