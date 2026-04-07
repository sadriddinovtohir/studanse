import GrowthProgress from "@/components/atoms/CustomProgres/CustomProgres"
import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon"
import { studentAchievementQuery } from "@/query"
import { useQuery } from "@tanstack/react-query"
import { Trophy } from "lucide-react"

export default function Achievements() {
  const { data } = useQuery({ ...studentAchievementQuery() })

  const achievements = data?.data ?? []

  console.log(achievements);


  return (
    <div>
      <div className='flex justify-center'>
        <CustomIcon
          iconsize={30}
          className={"bg-[transparent] border-none"}
          iconColor={'text-[#F2BE00FF]'}
          icon={Trophy}
          font={700}
          title='Achievements'
        />
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        {/* {achievements?.map((item) => (
          <GrowthProgress
            key={item.id}
            achievementType={item.achievementType}
            achievementPeriod={item.achievementPeriod}
          />
        ))} */}
      </div>
    </div>
  )
}