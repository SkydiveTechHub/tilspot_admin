import React, { useEffect, useState } from 'react'
import { DashboardLogo } from '../../../utils/data'
import { Link, useLocation } from 'react-router-dom'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BiTransferAlt } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiCloudOn } from "react-icons/ci";
import { TbSettings2 } from "react-icons/tb";
import { MdOutlineLiveHelp } from "react-icons/md";
import { Wallet1, Briefcase, ChartSquare, Mobile, LoginCurve } from 'iconsax-react';
import { CancelRounded } from '@mui/icons-material';



const SideBar = ({handleClick}) => {
  const accordionStyle = {
    px: 0,
    background: "transparent",
    boxShadow: "none",
    color: "rgba(255, 255, 255, 1)",
    border: "none",
  };

  const location = useLocation();
  
  const [role, setRole] = useState('')

  useEffect(()=>{
    const role = localStorage.getItem('role')
    setRole(role)
  }, [])

  const navData = (role) => [
    {
      category: 'Main',
      tabs: [
  
        ...(role === 'operator'
          ? [
            {
              name: 'Dashboard',
              icons: <LuLayoutDashboard />,
              url: '/index',
            },
            ]
          : []),
        ...(role === 'admin'
          ? [
              {
                name: 'Staff',
                icons: <LuLayoutDashboard />,
                url: '/staff',
              },
            ]
          : []),
        {
          name: 'Airtime',
          icons: <BiTransferAlt />,
          url: '/airtime',
        },
        {
          name: 'Internet',
          icons: <Wallet1 size={16} />,
          url: '/internet',
        },
        {
          name: 'Cable Tv',
          icons: <Mobile size={16} />,
          url: '/cable',
        },
        {
          name: 'Electricity',
          icons: <CiCloudOn />,
          url: '/electricity',
        },
        {
          name: 'Gas',
          icons: <CiCloudOn />,
          url: '/gas',
        },
        {
          name: 'Parking',
          icons: <ChartSquare size={16} />,
          url: '/parking',
        },
        {
          name: 'Transport',
          icons: <ChartSquare size={16} />,
          url: '/transport',
        },
        {
          name: 'Waste',
          icons: <ChartSquare size={16} />,
          url: '/waste',
        },
        {
          name: 'Government',
          icons: <ChartSquare size={16} />,
          url: '/government',
        },
        {
          name: 'Football',
          icons: <ChartSquare size={16} />,
          url: '/football',
        },
        {
          name: 'Housing',
          icons: <ChartSquare size={16} />,
          url: '/housing',
        },
        ...(role === 'admin'
          ? [
            {
              name: 'Fees',
              icons: <ChartSquare size={16} />,
              url: '/fees',
            },
            {
              name: 'Statistics',
              icons: <ChartSquare size={16} />,
              url: '/statistics',
            },
            ]
          : []),
        {
          name:'Transactions',
          icons: <ChartSquare size={16} />,
          url: '/transactions',
        }
  
      ],
    },
  ];

  const navigation = navData(role);

  return (
    <NavContainer>
      <div className='w-full flex  p-6 justify-between lg:justify-center items-center'>
        
        <DashboardLogo/>
        <div><button className=' font-[500] text-black rounded-full sm:rounded-lg shadow-md lg:hidden' onClick={handleClick}><span><CancelRounded size={32}/></span></button></div>
      </div>

      <div className='space-y-8 overflow-y-auto h-full'>
        {
          navigation?.map((i, id)=>{
            return(
              <div key={id} className=''>
                <p className='text-[#828282] font-[500] text-[16px] font-mont pl-4'>{i.category}</p>
                <div className='flex flex-col gap-3'>
                  {
                    i.tabs.map((tab, id) => {
                      if ('children' in tab) {
                        return (
                          <Accordion className='nav-accordion' style={accordionStyle} key={id}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon color="info" />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              style={{px:0}}
                            >
                              <Typography sx={{ color: '#fff', fontWeight: '500',fontSize: '14px', display:'flex', alignItems:'center' }}><span className='inline mr-2'>{tab.icons}</span><span className='inline'>{tab.name}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {tab.children?.map((link, index) => (
                                <div key={index} className="flex flex-col pl-3">
                                  <Link
                                    onClick={handleClick}
                                    className={`font-[500] text-[14px] font-mont p-3 flex gap-2 items-center pl-6 ${location.pathname === (
                                      `/dashboard${link.url}`
                                    )
                                      ? 'bg-primary font-mont font-[500] text-white rounded-md'
                                      : 'text-[#4F4F4F]'
                                    }`}
                                    to={`/dashboard${link.url}`} // Note: use "to" for react-router Link, not "href"
                                  >
                                    <span>{link.icons}</span>
                            
                                    <span>
                                      {link.name}
                                    </span>
                                  </Link>
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        );
                      } else {
                        return (
                          <Link
                            onClick={handleClick}
                            className={`flex gap-2 items-center font-[500] text-[14px] pl-6 font-mont p-3  ${location.pathname===(
                              `/dashboard${tab.url}`
                            )
                              ? 'bg-primary font-mont font-[500] text-white rounded-md'
                              : 'text-[#4F4F4F]'
                            }`}
                            to={`/dashboard${tab.url}`} // Fixed typo: use "to" for react-router Link
                            key={id}
                          >
                            <span>{tab.icons}</span>
                            
                            <span>
                              {tab.name}
                            </span>
                            
                          </Link>
                        );
                      }
                    })
                  }

                </div>
              </div>
            )
          })
        }
      </div>
      

    </NavContainer>
  )
}

export default SideBar


const NavContainer = ({children})=>{
    return (
        <div className='w-full fixed  z-[-1] '>
          <div className='w-full h-full absolute top-0 left-0 z-[-1]'></div>
          <div>
            {children}
          </div>
            
        </div>
    )
}





