import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import StudentWeekly from '@/components/atoms/StudentWeekly/StudentWeekly'
import CustomInfo from '@/components/atoms/CustomInfo/CustomInfo'
import { ThemaContext } from '@/context/ThemaContext'
import { useQuery } from '@tanstack/react-query'
import { studentDataInfoQuery } from '@/query'
import { CalendarDays, TrendingUp, AlertTriangle, Clock } from 'lucide-react'
import { useContext } from 'react'

export default function StudentInfo() {
  const { thema } = useContext(ThemaContext)
  const { data } = useQuery({ ...studentDataInfoQuery() })

  const info = data?.data?.data
  const isDark = thema === 'dark'
  const bg = isDark ? '#0C1626' : '#F6F5F9'
  const iconBg = isDark ? '#0C1626' : '#F6F5F9'

  const cardStyle = {
    background: bg,
    boxShadow: isDark
      ? 'none'
      : '0 10px 30px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.8)'
  }

  const card = (children) => (
    <div className="p-5 rounded-2xl" style={cardStyle}>
      {children}
    </div>
  )

  return (
    <div className="flex w-[80%] mx-auto flex-col gap-5">

      <div className="flex justify-center">
        <CustomIcon iconsize={30} className="bg-transparent border-none"
          iconColor="text-[#4B95EBFF]" icon={CalendarDays}
          font={600} titlesize={25} title="Data Info Panel" />
      </div>
      <p className="text-center text-textGrey mt-[-15px]">Weekly Attendance Overview</p>

      {card(<StudentWeekly bg={cardStyle} weeklyDays={info?.weeklyAttendance?.days || []} />)}

      {info?.attendanceOverview && card(
        <>
          <CustomIcon iconsize={25} className="border-none" style={{ background: iconBg }}
            iconColor="text-textColor" icon={TrendingUp}
            font={600} titlesize={18} title="Attendance Overview" />
          <CustomInfo attendanceOverview={info.attendanceOverview} />
        </>
      )}

      {(info?.absenceByReason?.length > 0 || info?.lateByReason?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {info?.absenceByReason?.length > 0 && (
            <div className="p-5 rounded-2xl" style={cardStyle}>
              <CustomIcon iconsize={25} className="border-none" style={{ background: iconBg }}
                iconColor="text-red-500" icon={AlertTriangle}
                font={600} titlesize={18} title="Absence Reasons" />
              <CustomInfo absenceByReason={info.absenceByReason} />
            </div>
          )}

          {info?.lateByReason?.length > 0 && (
            <div className="p-5 rounded-2xl" style={cardStyle}>
              <CustomIcon iconsize={25} className="border-none" style={{ background: iconBg }}
                iconColor="text-orange-500" icon={Clock}
                font={600} titlesize={18} title="Late Reasons" />
              <CustomInfo lateByReason={info.lateByReason} />
            </div>
          )}

        </div>
      )}

    </div>
  )
}