import CustomCard from "@/components/organisms/CustomCard/CustomCard";
import React from "react";
import { Building2 } from "lucide-react";
import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import { useQuery } from "@tanstack/react-query";
import { schoolAllQuery } from "@/query";
import { CustomDialog } from "@/components/organisms/CustomDialog";

export default function SuperAdminHome() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const { data, isLoading } = useQuery({ ...schoolAllQuery() });
  const ollSchools = data?.data?.data;

  return (
    <div>
      <CustomIcon
        icon={Building2}
        title={"System Admin Dashboard"}
        titlesize={30}
      />
      <div className="flex justify-center gap-5 flex-wrap  ">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <CustomCard key={i} isLoading={true} />)
          : ollSchools?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedSchool(item);
                  setOpen(true);
                }}
                className="w-full max-w-[450px]"
              >
                <CustomCard
                  BadgeVariants={String(item.status)}
                  Badgeboolean={true}
                  avatarFallback={item.countryCode}
                  title={String(item.name)}
                  established={item.establishedYear}
                />
              </div>
            ))}
      </div>
      <CustomDialog
        open={open}
         onClose={setOpen}
        title={"lorem"}
        icon={Building2}
        iconsize={20}
        titlesize={17}
        initials={"initials"}
        info={"info"}
        status={"status"}
        address={"address"}
        established={"established"}
        Students={1234}
        Teachers={1234}
        Classes={1234}
        Admins={1234}
      />
    </div>
  );
}
