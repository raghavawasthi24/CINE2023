export const formfields = [
  {
    key: "name",
    type: "input",
    label: "Full Name",
    placeHolder: "Enter your Full Name",
  },
  {
    key: "studentNo",
    type: "input",
    label: "Student No",
    placeHolder: "Enter your Student No",
  },
  {
    key: "mobileNo",
    type: "input",
    label: "Mobile Number",
    placeHolder: "Enter your Whatsapp Number",
  },
  {
    key: "email",
    type: "input",
    label: "Email",
    placeHolder: "Enter your email",
  },
  {
    key: "branch",
    type: "select",
    label: "Branch",
    placeHolder: "Select your Branch",
    options: [
      {
        value: "CSE",
        label: "CSE",
      },
      {
        value: "CSEDS",
        label: "CSE-DS",
      },
      {
        value: "CSEAIML",
        label: "CSE-AIML",
      },
      {
        value: "AIML",
        label: "AIML",
      },
      {
        value: "IT",
        label: "IT",
      },
      {
        value: "CSIT",
        label: "CSIT",
      },
      {
        value: "CS",
        label: "CS",
      },
      {
        value: "ECE",
        label: "ECE",
      },
      {
        value: "EN",
        label: "EN",
      },
      {
        value: "ME",
        label: "ME",
      },
      {
        value: "CE",
        label: "CE",
      },
      {
        value: "CSEHINDI",
        label: "CSE-HINDI",
      },
    ],
  },
  {
    key: "gender",
    type: "select",
    label: "Gender",
    placeHolder: "Select your Gender",
    options: [
      {
        value: "Male",
        label: "Male",
      },
      {
        value: "Female",
        label: "Female",
      },
    ],
  },
  {
    key: "isHosteler",
    type: "select",
    label: "Are you Hosteler?",
    placeHolder: "Select your Hosteler",
    options: [
      {
        value: "true",
        label: "Yes",
      },
      {
        value: "false",
        label: "No",
      },
    ],
  },
];
