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
        key:"email_",
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
                value:"cse",
                label:"CSE"
            },
            {
                value:"it",
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
                value:"male",
                label:"Male"
            },
            {
                value:"female",
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