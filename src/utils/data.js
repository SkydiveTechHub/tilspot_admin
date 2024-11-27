import LOGO from "../assets/img/Logo.png";
import DashLOGO from "../assets/img/Logo.png";

export const Logo = ({size}) => {
	return <img src={LOGO} style={{width:`${size}rem`}} alt="sme cloud logo" />;
};

export const DashboardLogo = () => {
	return <img src='/images/Logo.png' alt="sme cloud logo" />;
};


export const pageEnum = [
	{
		title:'Dashboard',
		pages:[
			"/dashboard/", "/dashboard"
		]
	},
	{
		title:'Airtime',
		pages:[
			"/dashboard/airtime"
		]
	},
	{
		title:'Internet',
		pages:[
			"/dashboard/internet", 
		]
	},
	{
		title:'parking',
		pages:[
			"/dashboard/parking"
		]
	},
	{
		title:'Gas',
		pages:[
			"/dashboard/gas"
		]
	},
	{
		title:'Electricity',
		pages:[
			"/dashboard/electricity"
		]
	},
	{
		title:'Cable',
		pages:[
			"/dashboard/cable"
		]
	},
	{
		title:'Transport',
		pages:[
			"/dashboard/transport"
		]
	},
	{
		title:'Football Ticket ',
		pages:[
			"/dashboard/football"
		]
	},
	{
		title:'Housing',
		pages:[
			"/dashboard/housing"
		]
	},
	{
		title:'Government',
		pages:[
			"/dashboard/government"
		]
	},
	{
		title:'Waste',
		pages:[
			"/dashboard/waste"
		]
	},
	
]

export const featuresData = [
	{
		img: "/images/f4.png",
		title: "Securely authenticate users with WhatsApp OTPs for seamless access and verification",
		desc: "Deliver reliable one-time passwords to verify user identities and protect accounts effortlessly.",
		tag:'Instant OTP', 
		tagColor:'#EB5757',
		style:'flex-col md:flex-row'
	},
	{
		img: "/images/f3.png",
		title: "Send important updates and alerts directly to your users via WhatsApp",
		desc: "Keep your users informed with real-time notifications for transactions, reminders, and more.",
		tag:'Notifications', 
		tagColor:'#F2994A',
		style:'md:flex-row-reverse flex-col'
	},

	{
		img: "/images/f2.png",
		title: "Choose from pre-designed message templates for quick and easy communication",
		desc: "Streamline your messaging with customizable templates for various notifications and alerts.",
		tag:'Select Template', 
		tagColor:'#56CCF2',
		style:'flex-col md:flex-row'
	},
	{
		img: "/images/f1.png",
		title: "Send images, videos, and documents along with messages through WhatsApp",
		desc: "Enhance communication by delivering multimedia content for a more engaging user experience.",
		tag:'Multimedia Messaging', 
		tagColor:'#219653',
		style:'md:flex-row-reverse flex-col'
	},
	
	{
		img: "/images/f5.png",
		title: "Develop custom workflows and logic to tailor OTP delivery and notifications",
		desc: "Build personalized processes to fit your business needs with flexible logic and automation.",
		tag:'Create My Own Logic', 
		tagColor:'#9B51E0',
		style:'flex-col md:flex-row'
	},

];

export const Reasons = [
	{
		img: "/images/sales.svg",
		head: "Effortless Automation",
		text: "Streamline your data and airtime processes with ease using our structured APIs.",
	},
	{
		img: "/images/rates.svg",
		head: "Affordable Rates",
		text: "Purchase bulk data at affordable rates, maximizing your savings and scalability.",
	},
	{
		img: "/images/support.svg",
		head: "Personalized Supports",
		text: "Our dedicated team is here to provide personalized support and tailored solutions to meet your unique needs",
	},
	{
		img: "/images/experts.svg",
		head: "Industry Leading Experts",
		text: "With years of experience, we've set the standard for Airtime and Data solutions from day one.",
	},
];

export const FaqItem = [
	{
		title: "How long does it take to develop a custom website or mobile app?",
		text: "The timeline for development varies depending on the complexity of the project. We'll work closely with you to establish clear milestones and keep you updated throughout the process.",
	},
	{
		title: " Can I see examples of your previous work?",
		text: "Absolutely! Visit our portfolio to explore a selection of our completed client projects",
	},
	{
		title:
			"Do you provide ongoing support after the project is completed?",
		text: "Yes, we offer ongoing maintenance and support services to ensure your digital assets remain secure and up-to-date.",
	},
	{
		title: "Do you offer social media management services?",
		text: "Yes, we provide comprehensive social media management services to help you engage with your audience and build brand awareness across various platforms",
	},
	{
		title: "What sets AUTOBIZ.APP apart from other digital solution providers?",
		text: "Our commitment to excellence, creativity, and customer satisfaction sets us apart. We prioritize your success and go above and beyond to deliver exceptional results.",
	}
];
export const Api = [
	{
		title:'Balance EndPoint',
		body:`
			{ 
			"process" : "whatsapp_vending", \n
			"action": "get_balance", \n
			"api_key""U3JM4lEQKKGSGFIRUAH6JNMn8JleQOp87FCAQHJkRb3Z6GAM0MjREY2K7zicZHG8XRhiysCxeN4iNrnGaEMXaiSF6XCxQpm56l1Hk9GP96Wj3lFFXzLOgzYV82dKHS5N"
			}
		`	,
		response:`
			{ 
				"server_message": "Balance Fetched",\n
				"status": true, \n
				"data": {\n
				"wallet_balance": "30144878.00", \n
				"subscription_status": "active",\n
				"otp_count": 388, \n
				"notification_count": 5000\n
				}, \n
				"data_result": [],\n
				"error_data": [],\n
				"text_status": "success", \n
				"error": null\n
				}
		`
	}
]
// FOOTER......................................................
export const socialLinks = [
	{ href: "#/", src: "/images/LinkedIn.svg", alt: "LinkedIn" },
	{ href: "#/", src: "/images/facebook.svg", alt: "Facebook" },
	{ href: "#/", src: "/images/youtube.svg", alt: "Youtube" },
	{ href: "#/", src: "/images/twitter.svg", alt: "Twitter" },
	{ href: "#/", src: "/images/Instagram.svg", alt: "Instagram" },
];

export const serviceLinks = [
	{ href: "#/", text: "Bulk Data" },
	{ href: "#/", text: "Cloud Services" },
	{ href: "#/", text: "Cloud Services" },
	{ href: "#/", text: "Cloud Services" },
];

export const companyLinks = [
	{ href: "#/", text: "About Us" },
	{ href: "#/", text: "Our Mission" },
	{ href: "#/", text: "Our Vision" },
];

export const contactLinks = [
	{ href: "", text: "Pricing Plan" },
	{ href: "", text: "Faqs" },
	{ href: "", text: "Contact Us" },
];


export const PlansData = [
    {
		slug:'free',
        name:'Free Version',
        price:'0',
        features:[
            '20 messages per month',
            'N4,500 for 100 extra messages',
            '+20 free messages with bundle',
            '24/7 connection',
            'Reset: After 3 days',
            'Over the limit cost : 60',
        ],
        tagged:false
    },
    {
		slug:'budget',
        name:'Budget Plan',
        price:'5000',
        features:[
            '20 messages per month',
            'N4,500 for 100 extra messages',
            '+20 free messages with bundle',
            '24/7 connection',
            'Reset: After 3 days',
            'Over the limit cost : 60',
        ],
        tagged:false
    },
    {
		slug:'standard',
        name:'Standard Plan',
        price:'15,000',
        features:[
            '350 messages per month',
            'N4,500 for 100 extra messages',
            '+20 free messages with bundle',
            '24/7 connection',
            'Reset: Monthly',
            'Over the limit cost : 60',
        ],
        tagged:true
    },
    {
		slug:'premium',
        name:'Premium Plan',
        price:'30,000',
        features:[
            '800 messages per month',
            'N4,500 for 100 extra messages',
            '+20 free messages with bundle',
            '24/7 connection',
            'Reset: Monthly',
            'Over the limit cost : 60'
        ],
        tagged:false
    },
    {
		slug:'enterprise',
        name:'Enterprise Plan',
        price:'Custom',
        features:[
            'Custom messages',
            'N/A',
            'N/A',
            '24/7 connection',
            'Reset: Monthly',
        ],
        tagged:false
    },
]