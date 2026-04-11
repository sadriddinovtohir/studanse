import CustomTeacherinfo from '@/components/atoms/CustomTeacherinfo/CustomTeacherinfo'
import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import IndividualReportinTeacher from '@/components/organisms/IndividualReportinTeacher/IndividualReportinTeacher'
import { ThemaContext } from '@/context/ThemaContext'
import { teacherInfoQuery } from '@/query'
import { useQuery } from '@tanstack/react-query'
import { ChartColumnBig } from 'lucide-react'
import React, { useContext } from 'react'

export default function TeacherInfo() {
  const { thema } = useContext(ThemaContext)
  const [selectedClass, setSelectedClass] = React.useState(null)

  const { data } = useQuery({
    ...teacherInfoQuery(),
    placeholderData: (prev) => prev
  })

  const classesData = data?.data?.data?.classes || []
  const analytics = data?.data?.data?.classAnalytics

  const selectBg = thema === 'dark'
    ? 'bg-[#1a1a2e] text-white border-[#ffffff22]'
    : 'bg-white text-gray-800 border-gray-300'

  const cardBg = thema === 'dark'
    ? 'bg-[#0C1626FF] border border-[#ffffff0f]'
    : 'bg-white border border-gray-200 shadow-sm'

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h1 className='text-textColor text-[27px] font-[700]'>Data Information</h1>
        <p className='text-textGrey'>Attendance analytics and individual student reports</p>
      </div>

      <IndividualReportinTeacher classesData={classesData} />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <CustomIcon
          iconsize={30}
          className={"bg-[#2B0E2EBB] border-none"}
          iconColor={'text-[#AD46FFFF]'}
          icon={ChartColumnBig}
          titlesize={20}
          font={700}
          title='Overall Analytics'
        />
        <div className="flex items-center gap-2">
          <span className="text-textGrey text-sm">Filter by Class:</span>
          <select
            value={selectedClass || ''}
            onChange={e => setSelectedClass(e.target.value || null)}
            className={`px-3 py-2 rounded-lg border text-sm outline-none cursor-pointer ${selectBg}`}
          >
            <option value="">All Classes</option>
            {classesData?.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Absence Reasons</p>
          <CustomTeacherinfo
            type="pie"
            items={analytics?.absenceByReason || []}
            label="Absence Reasons"
          />
        </div>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Late Arrival Reasons</p>
          <CustomTeacherinfo
            type="pie"
            items={analytics?.lateByReason || []}
            label="Late Arrival Reasons"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Weekly Attendance</p>
          <CustomTeacherinfo
            type="bar"
            days={analytics?.weeklyBarChart?.days || []}
          />
        </div>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Monthly Trends</p>
          <CustomTeacherinfo
            type="line"
            months={analytics?.monthlyTrend?.months || []}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Absence Distribution</p>
          <CustomTeacherinfo
            type="pie"
            items={analytics?.absenceByClass || []}
            label="Absence by Class"
          />
        </div>
        <div className={`p-4 rounded-2xl ${cardBg}`}>
          <p className='text-textColor font-[600] text-[14px] mb-3'>Late Arrivals Distribution</p>
          <CustomTeacherinfo
            type="pie"
            items={analytics?.lateByClass || []}
            label="Late by Class"
          />
        </div>
      </div>
    </div>
  )
}