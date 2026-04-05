import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import { CustomSelect } from '@/components/molecules/CustomSelect'
import { Button } from '@/components/ui/button'
import { ThemaContext } from '@/context/ThemaContext'
import { studentsAllQuery } from '@/query'
import { useQuery } from '@tanstack/react-query'
import { Search, User } from 'lucide-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import AdminAttendance from '../AdminAttendance/StudentAttendance'

export default function IndividualReport({ classesData }) {
    const { control, watch, setValue, register } = useForm();
    const [opendata, setopendata] = React.useState(false)
    const { thema } = useContext(ThemaContext)
    const [searchInput, setSearchInput] = React.useState("")
    const [searchbtn, setsearchbtn] = React.useState(false)
    const [selectedSearchStudent, setSelectedSearchStudent] = React.useState(null)
    const [filterData, setFilterData] = React.useState(null)

    const selectedClass = watch("classId")
    const selectedStudent = watch("studentId")

    const { data: allData } = useQuery({ ...studentsAllQuery({ page: 1, size: 100 }) })
    const grupStudents = allData?.data?.data?.content || []

    const classesOptions = classesData?.map(({ id, name }) => ({ value: id, label: name })) ?? []
    const studentOptions = grupStudents.map(({ id, firstName, lastName, enrollmentDate, dateOfBirth }) => ({
        value: id, label: `${firstName} ${lastName}`, dateOfBirth, enrollmentDate,
    })) ?? []

    const searchResults = searchInput.trim().length > 0
        ? grupStudents.filter(s =>
            `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchInput.toLowerCase())
        )
        : []

    React.useEffect(() => {
        if (!selectedStudent) return
        const student = grupStudents.find(s => s.id === selectedStudent)
        if (student) {
            setValue("fromDate", student.enrollmentDate ?? "", { shouldDirty: false })
            setValue("toDate", new Date().toISOString().split('T')[0], { shouldDirty: false })
        }
    }, [selectedStudent])

    const handleSelectSearchStudent = (student) => {
        setSelectedSearchStudent(student)
        setValue("studentId", student.id)
        setValue("classId", student.classGroupId)
        setValue("fromDate", student.enrollmentDate ?? "", { shouldDirty: false })
        setValue("toDate", new Date().toISOString().split('T')[0], { shouldDirty: false })
        setSearchInput("")
        setsearchbtn(false)
    }

    const onApplyFilter = () => {
        const student =
            grupStudents.find(s => s.id === selectedStudent) ||
            selectedSearchStudent

        const className = classesOptions.find(c => c.value === selectedClass)?.label

        setFilterData({
            studentId: selectedStudent,
            fromDate: watch("fromDate"),
            toDate: watch("toDate"),
            studentName: `${student?.firstName ?? ""} ${student?.lastName ?? ""}`,
            email: student?.email,
            className: className,
        })
        setopendata(true)
    }

    return (
        <div>
            <div className={`p-[16px] rounded-2xl ${thema === "dark" ? "bg-[#0C1626FF]" : "bg-[#F6F5F9FF] shadow-[0_1px_5px_rgba(0,0,1,1)]"}`}>
                <CustomIcon
                    iconsize={20}
                    className={"w-[40px] h-[40px] bg-[#00C1A2FF] border-none"}
                    iconColor={'text-[#AD46FFFF]'}
                    icon={User} font={600} titlesize={20}
                    title='Individual Student Report'
                />

                <div className='mt-4'>

                    <div className='flex flex-wrap items-center gap-3'>
                        <h3 className='text-textColor font-[700] text-[18px] sm:text-[20px]'>Search Student:</h3>
                        <div className='flex flex-wrap items-center gap-3 relative'>
                            <input
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                    setsearchbtn(true)
                                }}
                                onFocus={() => searchInput && setsearchbtn(true)}
                                className='p-1 shadow-[0_1px_10px_rgba(0,0,1,1)] rounded-md min-w-[200px]'
                                type="text"
                                placeholder="Ism yoki familya..."
                            />
                            <Button
                                type="button"
                                className={`flex items-center rounded-xl gap-2 transition-colors ${searchInput !== "" ? "bg-[#009874FF] text-white" : ""}`}
                            >
                                <Search className={`w-4 h-4 mt-1 transition-colors ${searchInput !== "" ? "text-white" : "text-textGrey"}`} />
                                <span>Search</span>
                            </Button>
                        </div>
                    </div>

                    {searchbtn && searchInput.trim().length > 0 && (
                        <div className={`${thema === "dark" ? "bg-[#3C3D3EFF]" : "bg-[#3C3D3E8C]"} p-4 max-h-[250px] overflow-y-auto rounded-xl mt-3`}>
                            <h3 className='mb-2 font-[600]'>
                                Search Results ({searchResults.length})
                            </h3>
                            {searchResults.length === 0 ? (
                                <p className='text-sm'>No students found matching: <b>{searchInput}</b></p>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    {searchResults.map((student) => (
                                        <div
                                            key={student.id}
                                            onClick={() => handleSelectSearchStudent(student)}
                                            className='flex items-center justify-between p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/25 transition-colors'
                                        >
                                            <span className='font-[500]'>
                                                {student.firstName} {student.lastName}
                                            </span>
                                            <span className='text-sm text-gray-400'>
                                                {student.classGroupName}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {selectedSearchStudent && !searchbtn && (
                        <div className='mt-2 flex items-center gap-2'>
                            <span className='text-sm text-textColor'>Selected:</span>
                            <span className='px-3 py-1 bg-[#009874FF] text-white rounded-full text-sm font-[500]'>
                                {selectedSearchStudent.firstName} {selectedSearchStudent.lastName}
                            </span>
                            <button
                                onClick={() => {
                                    setSelectedSearchStudent(null)
                                    setValue("studentId", null)
                                    setopendata(false)
                                }}
                                className='text-xs text-red-400 hover:text-red-600'
                            >
                                ✕ Clear
                            </button>
                        </div>
                    )}

                    <div className='flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 my-2'>
                        <div className='flex items-center justify-between sm:justify-start sm:gap-3'>
                            <h3 className='text-textColor font-[700] text-[15px] sm:text-[17px]'>Select Class:</h3>
                            <CustomSelect
                                name="classId" control={control}
                                placeholder="Choose a class..."
                                className="rounded-xl w-[160px] sm:w-[200px] bg-gray-200 text-black"
                                options={classesOptions}
                            />
                        </div>

                        {selectedClass && (
                            <div className='flex items-center justify-between sm:justify-start sm:gap-3'>
                                <h3 className='text-textColor font-[700] text-[15px] sm:text-[17px]'>Select Student:</h3>
                                <CustomSelect
                                    name="studentId" control={control}
                                    placeholder="Choose a student..."
                                    className="rounded-xl w-[160px] sm:w-[200px] bg-gray-200 text-black"
                                    options={studentOptions}
                                />
                            </div>
                        )}
                    </div>

                    {selectedStudent && (
                        <div className='flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mt-2'>
                            <h3 className='text-textColor font-[500] text-[15px] sm:text-[16px]'>Date Range:</h3>
                            <label className='flex items-center justify-between sm:justify-start gap-2 text-textColor'>
                                From:
                                <input {...register("fromDate")} className='rounded-lg p-1 text-textGrey' type="date" />
                            </label>
                            <label className='flex items-center justify-between sm:justify-start gap-2 text-textColor'>
                                To:
                                <input {...register("toDate")} className='rounded-lg p-1 text-textGrey' type="date" />
                            </label>
                            <Button type="button" onClick={onApplyFilter} className='w-full sm:w-auto'>
                                Apply Filter
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {opendata && filterData && (
                <div className={`p-[16px] mt-[30px] rounded-2xl ${thema === "dark" ? "bg-[#0C1626FF]" : "bg-[#F6F5F9FF] shadow-[0_1px_5px_rgba(0,0,1,1)]"}`}>
                    <AdminAttendance filterData={filterData} />
                </div>
            )}
        </div>
    )
}