import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { StatusTag } from '../../../components/shared/button'
import TransactionsTable from '../../../components/dashboardComponents/transactions'
import { Section } from '../../../components/shared/container/container'
import DeleteInstanceModal from '../../../components/shared/Modals/DeleteInstanceModal'
import { Switch } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import AddFootballTicketProvider from '../../../components/shared/Modals/football/AddFootballProvider'
import { deleteMatch, deleteTicket, getMatchTickets } from '../../../store/actions'
import { useDispatch } from 'react-redux'

const PreviewFootballMatches = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [deleteATicket, setDeleteATicket] = useState(false)
  const [match, setMatch] =useState()
  const [tickets, setTickets] =useState()
  const [ticketData, setTicketData] =useState()
  const params = useParams()
  const {id} = params
  const providerId = id.split('-')[0]
  const matchId = id.split('-')[1]


  const usable_column = [
    ...columns,
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => {


        return (
          <div className='flex items-center gap-4'>
            {/* <button onClick={()=>setUpgradeModal(true)}><img src="/images/edit.svg" alt="" /></button> */}
            <button onClick={()=>{setDeleteATicket(true); setTicketData(record)}}><img src="/images/bin.png" alt="" /></button>
          </div>
        );
      },
    },
  ];

  const fetchMatchTickets = async ()=>{
    const params={providerId, matchId}
    try {
      const res = await dispatch(getMatchTickets(params))
      if (res.payload.statusCode){
        setMatch(res.payload.data.match)
        setTickets(res.payload.data.tickets)
      }
    } catch (error) {
      
    }
  }

      const handleDelete = async () =>{
        try {
          const res = await dispatch(deleteMatch(id))
        } catch (error) {
          console.log(error)
        }
      }
      const handleDeletePlan = async () =>{
        try {
          const res = await dispatch(deleteTicket({
            matchId :id,
            ticket: ticketData._id
          }))
          
    
        } catch (error) {
          console.log(error)
        }
      }

  useEffect(()=>{
    fetchMatchTickets()
  },[])
  return (
    <>
      <AddFootballTicketProvider
        openModal={upgradeModal}
        handleCancel={()=>setUpgradeModal(false)}
        handleOk={()=>setUpgradeModal(false)}
      />

      <DeleteInstanceModal
        openModal={open}
        char={'Football Match'}
        handleCancel={()=>setOpen(false)}
        handleOk={handleDelete}
    />

    <DeleteInstanceModal
        openModal={deleteATicket}
        char={'Ticket'}
        handleCancel={()=>setDeleteATicket(false)}
        handleOk={handleDeletePlan}
    />

      <div>
        <div >
          <div className='flex justify-between items-start w-full'>
              <ul className='space-y-3'>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'League Name:'}/><GrayText style={'text-[16px]'} text={match?.league}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Home Team:'}/><GrayText style={'text-[16px]'} text={match?.homeTeam}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Away Team:'}/><GrayText style={'text-[16px]'} text={match?.awayTeam}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Stadium:'}/><GrayText style={'text-[16px]'} text={match?.stadium}/></li>
                  <li><BlackText style={'font-bold text-[14px] capitalize'} text={'Date & Time:'}/><GrayText style={'text-[16px]'} text={'10/12/2202 - 10:00 GMT'}/></li>
              </ul>
              <div className='flex items-center  gap-4'>
                <button onClick={()=>{setUpgradeModal(true)}} className='bg-[#219653] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/add-icon.png' className='inline-flex pr-2' alt='account'/>Edit Match</button>
                <button onClick={()=>{setOpen(true)}} className='bg-[#FF0000] rounded-[8px] font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'><img src='/images/bin-icon.png' className='inline-flex pr-2' alt='account'/>Delete Match</button>
              </div>   
          </div>

          
        </div>

        <Section title={"Available Zones"}>
          <TransactionsTable columns={usable_column} data={tickets} handleView={()=>navigate('/dashboard/preview-instance')}/>            
        </Section> 
      </div>    
    </>

  )
}

export default PreviewFootballMatches



const columns = [
  {
    title: 'Seat Area',
    dataIndex: 'sittingArea',
    key: 'sittingArea',
  },
  {
    title: 'Price Per Ticket',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

