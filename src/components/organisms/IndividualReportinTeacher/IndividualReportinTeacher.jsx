import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import { CustomSelect } from '@/components/molecules/CustomSelect'
import { Button } from '@/components/ui/button'
import { ThemaContext } from '@/context/ThemaContext'
import { teacherStudentsQuery } from '@/query'
import { useQuery } from '@tanstack/react-query'
import { Search, User } from 'lucide-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

export default function IndividualReportinTeacher({ classesData }) {
    const { watch, control, setValue } = useForm()
    const { data: allData } = useQuery({ ...teacherStudentsQuery({ page: 1, size: 100 }) })
    const grupStudents = allData?.data?.data || []


    const studentOptions = grupStudents.map(({ classId, className }) => ({
        value: classId, label: `${className} `,
    })) ?? []

    const [selectedSearchStudent, setSelectedSearchStudent] = React.useState(null)
    const [searchInput, setSearchInput] = React.useState("")
    const [showDropdown, setShowDropdown] = React.useState(false)
    const { thema } = useContext(ThemaContext)

    const classesOptions = classesData?.map(({ classId, name }) => ({ value: classId, label: name })) ?? []




    const searchResults = searchInput.trim().length > 0
        ? grupStudents.filter(s =>
            `${s.className}`.toLowerCase().includes(searchInput.toLowerCase())
        )
        : []

    const selectedClass = watch("classId")
    const selectedStudent = watch("studentId")

    const handleSelectSearchStudent = (student) => {
        setSelectedSearchStudent(student)
        setSearchInput(`${student.className} `)
        setShowDropdown(false)
    }

    const handleClear = () => {
        setSelectedSearchStudent(null)
        setSearchInput("")
        setValue("studentId", null)
        setShowDropdown(false)
    }

    const isDark = thema === "dark"
    const cardBg = isDark ? "bg-[#0C1626FF]" : "bg-[#F6F5F9FF] shadow-[0_1px_5px_rgba(0,0,0,0.15)]"
    const inputBg = isDark ? "bg-[#1C2A3AFF] text-white border-[#ffffff15]" : "bg-white text-gray-800 border-gray-200"
    const dropdownBg = isDark ? "bg-[#1C2A3AFF] border-[#ffffff15]" : "bg-white border-gray-200"

    return (
        <div className={`p-5 rounded-2xl mb-4 ${cardBg}`}>
            <CustomIcon
                iconsize={20}
                className={"w-[40px] h-[40px] bg-[#00C1A2FF] border-none"}
                iconColor={'text-[#AD46FFFF]'}
                icon={User}
                font={600}
                titlesize={20}
                title='Individual Student Report'
            />

            <div className='mt-5 flex flex-col gap-4'>

                <div>
                    <h3 className='text-textColor font-[600] text-[14px] mb-2'>Search Student by Name:</h3>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textGrey' />
                        <input
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                                setShowDropdown(true)
                                if (!e.target.value) setSelectedSearchStudent(null)
                            }}
                            onFocus={() => searchInput && setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                            className={`w-full pl-9 pr-24 py-2.5 rounded-xl border text-[14px] outline-none transition-all ${inputBg}`}
                            type="text"
                            placeholder="Type student name to search across all classes..."
                        />
                        <Button
                            type="button"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 bg-[#7C3AEDFF] hover:bg-[#6D28D9FF] text-white text-[13px] rounded-lg flex items-center gap-1.5"
                        >
                            <Search className='w-3.5 h-3.5' />
                            Search
                        </Button>

                        {showDropdown && searchInput.trim().length > 0 && (
                            <div className={`absolute top-full left-0 right-0 mt-1 border rounded-xl z-50 max-h-[220px] overflow-y-auto shadow-lg ${dropdownBg}`}>
                                {searchResults.length === 0 ? (
                                    <p className='text-sm text-textGrey p-3'>
                                        No students found for: <b>{searchInput}</b>
                                    </p>
                                ) : (
                                    searchResults.map((student) => (
                                        <div
                                            key={student.classId}
                                            onMouseDown={() => handleSelectSearchStudent(student)}
                                            className='flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[#7C3AED22] transition-colors'
                                        >
                                            <span className='text-textColor font-[500] text-[14px]'>
                                                {student.className}
                                            </span>
                                            <span className='text-[12px] text-textGrey'>
                                                {student.classGroupName}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {selectedSearchStudent && !showDropdown && (
                        <div className='mt-2 flex items-center gap-2'>
                            <span className='text-[12px] text-textGrey'>Selected:</span>
                            <span className='px-3 py-1 bg-[#009874FF] text-white rounded-full text-[12px] font-[500]'>
                                {selectedSearchStudent.className}
                            </span>
                            <button onClick={handleClear} className='text-[12px] text-red-400 hover:text-red-500'>
                                ✕ Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Select Class + Student */}
                <div className='flex flex-wrap items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <span className='text-textColor font-[600] text-[14px] whitespace-nowrap'>Select Class:</span>
                        <CustomSelect
                            name="classId"
                            control={control}
                            placeholder="Choose a class..."
                            className="rounded-xl w-[180px] bg-gray-200 text-black"
                            options={classesOptions}
                        />
                    </div>

                    {selectedClass && (
                        <div className='flex items-center gap-2'>
                            <span className='text-textColor font-[600] text-[14px] whitespace-nowrap'>Select Student:</span>
                            <CustomSelect
                                name="studentId"
                                control={control}
                                placeholder="Choose a student..."
                                className="rounded-xl w-[180px] bg-gray-200 text-black"
                                options={studentOptions}
                            />
                        </div>
                    )}
                </div>

                {/* Date Range */}
                {selectedStudent && (
                    <div className='flex flex-wrap items-center gap-3'>
                        <span className='text-textColor font-[600] text-[14px]'>Date Range:</span>
                        <label className='flex items-center gap-2 text-textColor text-[14px]'>
                            From:
                            <input

                                className={`rounded-lg px-2 py-1.5 text-[13px] border outline-none ${inputBg}`}
                                type="date"
                            />
                        </label>
                        <label className='flex items-center gap-2 text-textColor text-[14px]'>
                            To:
                            <input

                                className={`rounded-lg px-2 py-1.5 text-[13px] border outline-none ${inputBg}`}
                                type="date"
                            />
                        </label>
                        <Button
                            type="button"
                            className='bg-[#009874FF] hover:bg-[#007A5EFF] text-white px-5 py-2 rounded-xl text-[13px]'
                        >
                            Apply Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}