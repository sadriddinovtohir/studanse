import CustomAdminDataInfo from '@/components/atoms/CustomCharts/CustomAdminDataInfo'
import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import { WaveLoader } from '@/components/atoms/Loaer/Weveloader'
import IndividualReport from '@/components/organisms/IndividualReport/IndividualReport'
import { ThemaContext } from '@/context/ThemaContext'
import { adminInfoQuery } from '@/query'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, BarChart, ChartColumnBig, Clock, TrendingUp, CalendarDays } from 'lucide-react'
import React, { useContext, useState } from 'react'

export default function AdminInfo() {
  const { thema } = useContext(ThemaContext)
  const [selectedClass, setSelectedClass] = useState(null)
  const { data, isLoading, isFetching } = useQuery({
    ...adminInfoQuery(selectedClass),
    placeholderData: (prev) => prev
  })
  const classesData = data?.data?.data?.classes
  const classAnalytics = data?.data?.data?.classAnalytics

  if (isLoading) {
    return (
      <div className='flex h-[50vh] justify-center items-center'>
        <WaveLoader />
      </div>
    )
  }

  const absenceItems = classAnalytics?.absenceByReason?.map((item, i) => ({
    name: item.reasonName,
    value: item.percentage,
    color: ['#ef4444', '#3b82f6', '#a855f7', '#22c55e', '#f97316'][i % 5],
  })) || []

  const lateItems = classAnalytics?.lateByReason?.map((item, i) => ({
    name: item.reasonName,
    value: item.percentage,
    color: ['#eab308', '#06b6d4', '#ec4899', '#6366f1', '#22c55e'][i % 5],
  })) || []

  const cardBg = thema === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white shadow'
  const wrapBg = thema === 'dark' ? 'bg-[#0C1626FF]' : 'bg-[#F6F5F9FF] shadow-[0_1px_5px_rgba(0,0,1,1)]'
  const selectBg = thema === 'dark' ? 'bg-[#1a1a2e] text-white border-[#ffffff22]' : 'bg-white text-gray-800 border-gray-300'

  return (
    <div>
      <div>
        <CustomIcon
          iconsize={30}
          className={"bg-[#2B0E2EBB] border-none"}
          iconColor={'text-[#AD46FFFF]'}
          icon={BarChart}
          font={700}
          title='Data Information'
        />
        <p className='text-textGrey my-3 text-[17px]'>
          Attendance analytics and individual student reports
        </p>
      </div>

      <div>
        <IndividualReport classesData={classesData} />
      </div>

      <div className={`relative p-[16px] my-[25px] rounded-2xl ${wrapBg}`}>

        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl z-10">
            <WaveLoader />
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`p-4 rounded-xl ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <span className="text-textColor font-semibold">Absence Reasons Analysis</span>
            </div>
            <CustomAdminDataInfo type="pie" items={absenceItems} label="Absence Reasons" />
          </div>

          <div className={`p-4 rounded-xl ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-yellow-500" />
              </div>
              <span className="text-textColor font-semibold">Late Arrival Reasons Analysis</span>
            </div>
            <CustomAdminDataInfo type="pie" items={lateItems} label="Late Reasons" />
          </div>

          <div className={`p-4 rounded-xl ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={18} className="text-blue-400" />
              <span className="text-textColor font-semibold">Weekly Attendance</span>
            </div>
            <CustomAdminDataInfo type="bar" days={classAnalytics?.weeklyBarChart?.days || []} />
          </div>

          <div className={`p-4 rounded-xl ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-purple-400" />
              <span className="text-textColor font-semibold">Monthly Trends</span>
            </div>
            <CustomAdminDataInfo type="line" months={classAnalytics?.monthlyTrend?.months || []} />
          </div>
        </div>
      </div>
    </div>
  )
}