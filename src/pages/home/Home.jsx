import CustomSelect from "@/components/molecules/CustomSelect";
import DataTable from "@/components/organisms/DataTable";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const selectdata =[
    {
      name:"lorem",
    },
    {
      name:"lorem",
    },
    {
      name:"lorem",
    },
    {
      name:"lorem",
    },
  ]
  
  return (
    <div className="w-full">
  <CustomSelect selectData={selectdata}/>
    </div>
  );
}
