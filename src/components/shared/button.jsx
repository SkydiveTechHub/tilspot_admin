import React, { useEffect, useState } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, message, Space, Tooltip } from 'antd';

export const AuthButton = ({ value, inactive,  handleClick }) => {
	return (
		<button
			disabled={inactive}
			onClick={handleClick}
			className={`${
				inactive ? "bg-[#919191] text-[#DADADA]" : "bg-gradient-to-r to-[#002b6f] from-blue-300 text-white"
			}  p-[10px] rounded-lg font-[500] font-mont text-[16px] w-full`}
			type="submit"
		>
			{value}
		</button>
	);
};
// bg-gradient-to-r from-purple-500 to-blue-300 text-white py-[12px] px-[21px] text-[14px] font-[700] leading-[17.07px] ${style}
export const PryButton = ({ text, imgUrl,handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className={`bg-gradient-to-r to-red-500 from-blue-300 rounded-[8px] font-mont text-white py-[10px] px-11 text-[16px] font-[500] leading-[24px]`}
		>
			
			{imgUrl && <img src={imgUrl} alt="icon" />}
			{text}
		</button>
	);
};



















export const DropdownButton = ({list}) =>{
	const [item, setItem] = useState('1')
	const [current, setCurrent] = useState({})

	const handleMenuClick = (e) => {
	// message.info('Click on menu item.');
	setItem(e.key)
	};

	const items = list

	useEffect(()=>{
		const current_item = items.find((i)=> i.key === item)
		setCurrent(current_item)
	}, [item])
	

	const menuProps = {
	items,
	onClick: handleMenuClick,
	};

	return(
	<Space wrap>
		<Dropdown menu={menuProps}>
		<Button className='dropdown-btn'>
			<Space>
			{current.label}
			<DownOutlined />
			</Space>
		</Button>
		</Dropdown>
	</Space>	
	)
}



export const UserStatusTag = ({ status }) => {
	// Function to determine colors based on the tag
	const getColors = (tag) => {
	  switch (tag) {
		case 'Successful':
		case 'Active':
		case 'Enabled':
		  return { color: '#2A9504', bgColor: '#DAFECD' };
		default:
		  return { color: '#1E1E1E', bgColor: '#F0F2EF' }; // Default colors if the tag doesn't match known values
	  }
	};
  
	return (
	  <>
		{status?.map((tag) => {
		  const { color, bgColor } = getColors(tag); // Get color based on tag
		  return (
			<div
			  style={{ backgroundColor: bgColor }}
			  className="px-3 justify-center items-center py-[2px] rounded-full border hidden md:block"
			  key={tag}
			>
			  <p
				style={{ color }}
				className="text-center font-mont font-[500] text-[12px]"
			  >
				{tag}
			  </p>
			  <p
				style={{ color }}
				className="text-center font-mont font-[400] text-[12px]"
			  >
				Subscription
			  </p>

			</div>
		  );
		})}
	  </>
	);
  };
export const StatusTag = ({ status }) => {
	// Function to determine colors based on the tag
	const getColors = (tag) => {
	  switch (tag) {
		case 'Failed':
		  return { color: '#950D04', bgColor: '#FAEBEA' };
		case 'Successful':
		case 'Enabled':
		case 'Activated':
		case 'Active':
		  return { color: '#2A9504', bgColor: '#DAFECD' };
		case 'Pending':
		case 'Disabled':
		  return { color: '#929502', bgColor: '#FDFECD' };
		default:
		  return { color: '#1E1E1E', bgColor: '#F0F2EF' }; // Default colors if the tag doesn't match known values
	  }
	};
  
	return (
	  <>
		{status?.map((tag) => {
		  const { color, bgColor } = getColors(tag); // Get color based on tag
		  return (
			<div
			  style={{ backgroundColor: bgColor, display: 'inline-flex' }}
			  className="px-3 justify-center items-center py-[2px] rounded-md border"
			  key={tag}
			>
			  <span
				style={{ color }}
				className="text-center font-mont font-[500] text-[12px]"
			  >
				{tag}
			  </span>
			</div>
		  );
		})}
	  </>
	);
  };


export const ConnectionTag = ({ status }) => {
	// Function to determine colors based on the tag
	const getColors = (tag) => {
	  switch (tag) {
		case 'disconnected':
		  return { badgecolor: '#FF5F52', color: '#000000' };
		case 'Connected':
		case 'Enabled':
		  return { badgecolor: '#950D04', color: '#000000' };
		default:
		  return { badgecolor: '#FF5F52', color: '#000000' }; // Default colors if the tag doesn't match known values
	  }
	};
  
	return (
	  <>
		{status?.map((tag) => {
		  const { badgecolor, color } = getColors(tag); // Get color based on tag
		  return (
			<div
			  style={{  display: 'inline-flex' }}
			  className="px-3 justify-center items-center py-[2px] rounded-md"
			  key={tag}
			>
				<Badge status='processing' color={badgecolor} text={tag} />
			  {/* <span
				style={{ color }}
				className="text-center font-mont font-[400] text-[12px]"
			  >
				{tag}
			  </span> */}
			</div>
		  );
		})}
	  </>
	);
  };
  