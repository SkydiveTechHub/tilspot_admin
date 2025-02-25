import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Popover, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserStatusTag } from '../../shared/button'
import { Link, useLocation, useParams } from 'react-router-dom'
import { LogoutModal } from '../shared'
import { BlackText } from '../../shared/typograph'
import { FiChevronDown } from 'react-icons/fi'
import { HambergerMenu } from 'iconsax-react'
import { pageEnum } from '../../../utils/data'
import { useSelector } from 'react-redux'
import EditStaffModal from '../../shared/Modals/staff/EditStaffModal'

const TopNav = ({handleClick}) => {
	const user = useSelector((state) => state.auth.user);
	const [pageTitle, setPageTitle] =  useState()
	const location = useLocation()
	const currentPage = location.pathname

	useEffect(()=>{
		const Page = pageEnum.find((i)=> i.pages.includes(currentPage) )
		if(Page){
			setPageTitle(Page.title)
		}else{
			setPageTitle('')
		}
	}, [location])

  return (
	<>


		<div className='w-full shadow-md  bg-[#F0F0F0] h-[80px] flex justify-between items-center px-6'>
			<div  className='lg:hidden'>
				<button className=' text-primary text-2xl font-500 p-3' onClick={handleClick}>
					{/* ☰ */}
					<HambergerMenu  size={30}/>
				</button>
			</div>

			<div>
				<BlackText style={'font-bold text-[14px] md:text-[20px]'} text={pageTitle}/>
			</div>

			<div className='flex lg:mr-[18%] gap-4'>
				{/* <div className="hidden lg:inline"><NotifMenu/></div> */}
				<UserMenu user={user}/>
			</div>


		</div>
	</>

  )
}

export default TopNav


const notifcontent = (
  <div className=' w-[350px]'>
	<span className='text-[#475569]'>Today, 20th Dec 2025</span>

	<div className=''>
		<div className='flex items-center gap-2 py-2 border-b'>
			<div>
			<Avatar
                    style={{
                    backgroundColor: 'blue',
                    verticalAlign: 'middle',
                    width:'60px',
                    height:'60px',
                    }}
                    size="large"
                    gap={10}
                >
                    {/* {(user?.first_name).charAt(0)} */}
            </Avatar>
			</div>
			<div>
				<p className='font-[500] font-mont text-[14px]'>Failed Transaction</p>
				<p className='font-[400] font-mont text-[14px]'>kdkdk</p>
			</div>
		</div>
	</div>
  </div>
);
const Content = () =>{
	const [isOpen, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	return(
		<div className='p-6 w-[250px]'>
		<div className='flex flex-col items-start gap-3'>
			{/* <Link className='font-[500] font-mont text-[14px]' to={'/'}>Edit Profile</Link>
			<Link className='font-[500] font-mont text-[14px]' to={'/'}>Subscription</Link> */}
			<button onClick={()=>setOpenEdit(true)} className='font-[500] font-mont text-[14px]' to={'/forgot-password'}><img src='/images/account.png' className='inline-flex pr-2' alt='account'/>Edit Profile</button>
			<Link className='font-[500] font-mont text-[14px]' to={'/forgot-password'}><img src='/images/account.png' className='inline-flex pr-2' alt='account'/>Reset Password</Link>
			<button onClick={()=>setOpen(true)} className='font-[500] font-mont text-[14px]'><img src='/images/Exit.png' className='inline-flex pr-2' alt='account'/>Log Out</button>
	
			<LogoutModal openModal={isOpen} handleOk={()=>setOpen(false)} handleCancel={()=>setOpen(false)}/>
			<EditStaffModal
              openModal={openEdit}
              handleCancel={()=>{setOpenEdit(false)}}
              handleOk={()=>setOpenEdit(false)}
            //   userData={userData}

			  
          /> 
		</div>
	  </div>
	)
}





const UserMenu = ({user}) => (
  <Popover content={Content} title="">
    <button>

	{/* <img className='w-[40px] rounded-full inline-flex  pr-1' src="" alt="user" /> */}
	<Avatar
                    // style={{
                    // backgroundColor: 'blue',
                    // verticalAlign: 'middle',
                    // width:'60px',
                    // height:'60px',
                    // }}
                    // size="large"
                    // gap={10}
                >
                    {(user?.first_name).charAt(0)}
            </Avatar>

	<Space>
		<span className='hidden lg:inline font-mont font-[500] text-[14px]'> {user?.first_name}</span>
		<FiChevronDown/>
	</Space>
	</button>
  </Popover>
);


const NotifMenu = () => (
  <Popover content={notifcontent} title="Your Notification">
    <button>
		<img src="/images/notif.svg" alt="icon" />
	</button>
  </Popover>
);