import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch, Tag } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
 
import AddParkingZone from '../../../components/shared/Modals/parking/AddParkingZone'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLocation, deleteZone, getZonesByLocation } from '../../../store/actions'
import { toast } from 'react-toastify'

const PreviewParkingLocation = () => {
  const params = useParams()
  const navigate = useNavigate()
  const {id} = params
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [zoneId, setZoneId] = useState('')
  const [deleteZoneModal, setDeleteZoneModal] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const {location, zoneInfo} = useSelector((state)=>state.providers.locationDetals)
  const [zoneData, setZoneData] = useState([])
  const [action, setAction] = useState('create')

  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {


        return (
          <div className='flex items-center gap-4'>
            <button onClick={()=>{setAction('edit'); setUpgradeModal(true); setZoneData(record)}}><img src="/images/edit.svg" alt="" /></button>
            <button onClick={()=>{setDeleteZoneModal(true); setZoneId(record._id)}}><img src="/images/bin.png" alt="" /></button>
          </div>
        );
      },
    },
  ];


    const fetchLocationZones = async ()=>{
      try {
        const res = dispatch(getZonesByLocation(id))
        console.log(res)
      } catch (error) {
        
      }
    }

    const handleDelete = async () =>{
      try {
        const res = await dispatch(deleteLocation(id))
            if(res.payload.statusCode) {
              toast.success('Parking Deleted Successfully!')
              navigate('/dashboard/parking')
              setOpen(false)
            }else{
              toast.error(res.payload.message)
              setOpen(false)
            }
        
  
      } catch (error) {
        console.log(error)
            toast.error('Something went wrong')
            setOpen(false)
      }
    }

  const handleDeleteZone = async () =>{
    try {
      const res = await dispatch(deleteZone(zoneId))
      if(res.payload.statusCode) {
        fetchLocationZones()
        toast.success('Zone Deleted Successfully!')
      }else{
        toast.error(res.payload.message)
      }
      setDeleteZoneModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  
    useEffect(()=>{
      fetchLocationZones()
    },[])
  return (
    <>
      <AddParkingZone
        id={id}
        openModal={upgradeModal}
        handleCancel={()=>{setUpgradeModal(false); setAction('create')}}
        handleOk={()=>{setUpgradeModal(false); setAction('create')}}
        data={zoneData}
        location={location}
        action={action}
      />
      <DeleteInstanceModal
        openModal={open}
        char={'Parking Location'}
        handleCancel={()=>setOpen(false)}
        handleOk={handleDelete}

    />
      <DeleteInstanceModal
        openModal={deleteZoneModal}
        char={'Parking Zone'}
        handleCancel={()=>setDeleteZoneModal(false)}
        handleOk={handleDeleteZone}

    />
      <div>
        <div >
          <div className='flex flex-col md:flex-row justify-between w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Location Name: '}/><GrayText style={'text-[16px]'} text={location || 'New York'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] text-[10px] md:text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Add Zone</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] text-[10px] md:text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Location</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Zones"}>
        <TransactionsTable columns={usable_column} data={zoneInfo || []} />
     
        </Section> 
      </div>    
    </>

  )
}

export default PreviewParkingLocation



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Pricing',
    dataIndex: 'timeOptions',
    key: 'timeOptions',
    render: (priceList) => {
      return (
        <>
          {priceList.slice(0, 7)?.map((item, index) => (
            <Tag color='volcano' key={index}>
              {item.duration} - {item.price}
            </Tag>
          ))}
        </>
      );
    },
  },
];



const data = [
  {
  //   key: '1',
    name: 'LA',
    pricing: 'Pricing',
  },


];