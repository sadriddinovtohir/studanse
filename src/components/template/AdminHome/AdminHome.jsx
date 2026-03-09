import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon'
import CustomCard from '@/components/organisms/CustomCard/CustomCard'
import { Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  return (
    <div>
         <CustomIcon icon={Users} title={"Admin Dashboard"} titlesize={30} iconsize={20}/> 
      <Link>
        <CustomCard
          BadgeVariants="active"
          Badgeboolean={false}
          deta={"30-september"}
          // src={user}
          title={"lorem"}
         mkClass={"Grade 10A"}
         abents={2}
         late={1}
        />
      </Link>
    </div>  /////
  )
}
