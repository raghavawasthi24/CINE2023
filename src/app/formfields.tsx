export const formfields=[
    {
        key:"name",
        type:"input",
        label:"Full Name",
        placeHolder:"Enter your Full Name", 
    },
    {
        key:"studentNo",
        type:"input",
        label:"Student No",
        placeHolder:"Enter your Student No", 
    },
    {
        key:"mobileNo",
        type:"input",
        label:"Mobile Number",
        placeHolder:"Enter your Whatsapp Number", 
    },
    {
        key:"email",
        type:"input",
        label:"Email",
        placeHolder:"Enter your email", 
    },
    {
        key:"branch",
        type:"select",
        label:"Branch",
        placeHolder:"Select your Branch",
        options:[
            {
                value:"CSE",
                label:"CSE"
            },
            {
                value:"IT",
                label:"IT"
            }
        ]
    },
    {
        key:"gender",
        type:"select",
        label:"Gender",
        placeHolder:"Select your Gender", 
        options:[
            {
                value:"Male",
                label:"Male"
            },
            {
                value:"Female",
                label:"Female"
            },
            {
                value:"none",
                label:"Rather Not To Say"
            },
        ]
    },
    {
        key:"isHosteler",
        type:"select",
        label:"Are you Hosteler?",
        placeHolder:"Select your Hosteler", 
        options:[
            {
                value:"true",
                label:"Yes"
            },
            {
                value:"false",
                label:"No"
            }
        ]
    },
]