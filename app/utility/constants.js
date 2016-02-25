export default {
  APPOINTMENT_MINS: {
    MIN: 360, // 6AM
    MAX: 1440, // 10PM
    MAX_HOUR: 24,
    MIN_HOUR: 6
  },

  GENDER: {
    Male: 'Male',
    Female: 'Female'
  },

  STATUS: {
    REQUESTED: 0,
    ACTIVE: 1,
    REJECTED: 2,
    INACTIVE: 3
  },

  FORM_STATUS: {
    NOT_STARTED: 'not-started',
    STARTED: 'started',
    COMPLETED: 'completed'
  },

  REQUEST_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
  },

  STATES: [
    { id: 'AK', name: 'Alaska' },
    { id: 'AL', name: 'Alabama' },
    { id: 'AR', name: 'Arkansas' },
    { id: 'AZ', name: 'Arizona' },
    { id: 'CA', name: 'California' },
    { id: 'CO', name: 'Colorado' },
    { id: 'CT', name: 'Connecticut' },
    { id: 'DC', name: 'District of Columbia' },
    { id: 'DE', name: 'Delaware' },
    { id: 'FL', name: 'Florida' },
    { id: 'GA', name: 'Georgia' },
    { id: 'HI', name: 'Hawaii' },
    { id: 'IA', name: 'Iowa' },
    { id: 'ID', name: 'Idaho' },
    { id: 'IL', name: 'Illinois' },
    { id: 'IN', name: 'Indiana' },
    { id: 'KS', name: 'Kansas' },
    { id: 'KY', name: 'Kentucky' },
    { id: 'LA', name: 'Louisiana' },
    { id: 'MA', name: 'Massachusetts' },
    { id: 'MD', name: 'Maryland' },
    { id: 'ME', name: 'Maine' },
    { id: 'MI', name: 'Michigan' },
    { id: 'MN', name: 'Minnesota' },
    { id: 'MO', name: 'Missouri' },
    { id: 'MS', name: 'Mississippi' },
    { id: 'MT', name: 'Montana' },
    { id: 'NC', name: 'North Carolina' },
    { id: 'ND', name: 'North Dakota' },
    { id: 'NE', name: 'Nebraska' },
    { id: 'NH', name: 'New Hampshire' },
    { id: 'NJ', name: 'New Jersey' },
    { id: 'NM', name: 'New Mexico' },
    { id: 'NV', name: 'Nevada' },
    { id: 'NY', name: 'New York' },
    { id: 'OH', name: 'Ohio' },
    { id: 'OK', name: 'Oklahoma' },
    { id: 'OR', name: 'Oregon' },
    { id: 'PA', name: 'Pennsylvania' },
    { id: 'RI', name: 'Rhode Island' },
    { id: 'SC', name: 'South Carolina' },
    { id: 'SD', name: 'South Dakota' },
    { id: 'TN', name: 'Tennessee' },
    { id: 'TX', name: 'Texas' },
    { id: 'UT', name: 'Utah' },
    { id: 'VA', name: 'Virginia' },
    { id: 'VT', name: 'Vermont' },
    { id: 'WA', name: 'Washington' },
    { id: 'WI', name: 'Wisconsin' },
    { id: 'WV', name: 'West Virginia' },
    { id: 'WY', name: 'Wyoming' }
  ],

  TIME_ZONES: [
    { id: 'Samoa', name: 'Samoa' },
    { id: 'Hawaii–Aleutian', name: 'Hawaii–Aleutian' },
    { id: 'Alaska', name: 'Alaska' },
    { id: 'Pacific', name: 'Pacific' },
    { id: 'Mountain', name: 'Mountain' },
    { id: 'Central', name: 'Central' },
    { id: 'Eastern', name: 'Eastern' },
    { id: 'Atlantic', name: 'Atlantic' },
    { id: 'Chamorro', name: 'Chamorro' }
  ],

  MONTHS: [
    { id: 1, name: 'January' },
    { id: 2, name: 'Febrauary' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ],

  RACES: [
    { id: 1, name: 'White' },
    { id: 2, name: 'African American' },
    { id: 3, name: 'Amer Indian/Alaskan Nat' },
    { id: 4, name: 'Asian' },
    { id: 5, name: 'Native Hawaiian or Other' },
    { id: 6, name: 'Mulit-Racial  ' }
  ],

  RACES_NAMES: [
    'White',
    'African American',
    'Amer Indian/Alaskan Nat',
    'Asian',
    'Native Hawaiian or Other',
    'Mulit-Racial'
  ],

  ETHNICITIES: [
    'Puerto Rican',
    'Mexican',
    'Cuban',
    'Other Hispanic',
    'Hatian',
    'Mexican American',
    'Spanish/Latino',
    'None of the above'
  ],

  PRIMARY_DRUGS: [
    'ALCOHOL',
    'MORPHINE SULFATE (MSContin)',
    'METHADONE',
    'CODEINE',
    'D-PROPOXYPHENE (Darvon/Darvocet)',
    'OXYCODONE (Oxycontin)',
    'CRACK',
    'MARIJUANA/HASHISH',
    'HEROIN',
    'NON-PRESCRIPTION METHADONE'
  ],

  DRUGS_FREQUENCIES: [
    'No Past Month Use (no use past 30 days)',
    '3-6 Times per Week',
    '1-3 Times in Past Month (30 days)',
    'Daily, 1-2 Times per Week'
  ],

  DRUGS_METHODS_OF_ADMIN: [
    'Oral',
    'Smoking',
    'Inhalation',
    'Injection (IV or Intra-Muscular)',
    'Other'
  ],

  EDUCATIONAL_GRADES: [
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
    'Vocational School',
    'High School Graduate',
    'Diploma/Degree',
    '1 or more year College',
    'Associate Degree (AA, AS, etc.)',
    'Bachelor Degree (BA, BS, AB, etc.)',
    'Master Degree (MS, MA, MSW, etc.)',
    'Prof. Degree (MD, DDS, JD, etc.)',
    'Doc. Degree (PhD, EDD, etc.)'
  ],

  EMPLOYMENT_STATUSES: [
    'Active military - overseas',
    'Active military - USA',
    'Full Time',
    'Unpaid Family Worker',
    'Part Time',
    'Leave of Absence',
    'Retired',
    'Terminated / unemployed',
    'Homemaker',
    'Student'
  ],

  LIVING_ARRAGEMENTS: [
    'Independent Living - Alone',
    'Independent Living - with Relatives',
    'Independent Living - with Non-Relatives',
    'Dependent Living - with Relatives',
    'Dependent Living - with Non-Relatives',
    'Assisted Ling Facility (ALF), Foster Care/Home'
  ],

  FORM_ORIENTATIONS: [
    'time',
    'day',
    'place',
    'year'
  ],

  FORM_MOODS: [
    'sad',
    'bad',
    'glad',
    'mad'
  ],

  LANGAUAGES: [
    { id: 1, name: 'English' },
    { id: 2, name: 'Spanish' },
    { id: 3, name: 'Portuguese' },
    { id: 4, name: 'Creole' },
    { id: 5, name: 'French' }
  ],

  INSURANCE_PLANS: [
    { id: 1, name: 'Aetna Health, Inc.' },
    { id: 2, name: 'AvMed, Inc.' },
    { id: 3, name: 'CIGNA Healthcare of Florida, Inc.' },
    { id: 4, name: 'Coventry Health Care of Florida, Inc.' },
    { id: 5, name: 'Coventry Health Plan of Florida, Inc.' },
    { id: 6, name: 'Health Options, Inc.' },
    { id: 7, name: 'Humana Medical Plan, Inc.' },
    { id: 8, name: 'Neighborhood Health Partnership, Inc.' },
    { id: 9, name: 'United Healthcare of Florida, Inc.' },
    { id: 10, name: 'Aetna Life Insurance Company' },
    { id: 11, name: 'Connecticut General Life Insurance Company (CIGNA)' },
    { id: 12, name: 'Florida Blue (PPO)' },
    { id: 13, name: 'Golden Rule Insurance Company' },
    { id: 14, name: 'Humana Health Insurance Company of Florida' },
    { id: 15, name: 'United Healthcare Insurance Company' },
    { id: 16, name: 'None' }
  ],

  DOCTOR_SPECAILITIES: [
    { id: 1, name: 'Allergy and Immunology' },
    { id: 2, name: 'Anesthesiology' },
    { id: 3, name: 'Colon and Rectal Surgery' },
    { id: 4, name: 'Dermatology' },
    { id: 5, name: 'Emergency Medicine' },
    { id: 6, name: 'Family Medicine' },
    { id: 7, name: 'Internal Medicine' }
  ],

  DOCTOR_PROFESSIONS: [
    { id: 'Physician', name: 'Physician' },
    { id: 'PhysicianAssistant', name: 'Physician Assistant' },
    { id: 'Assessor', name: 'Assessor' }
  ],

  REQUEST_STATUSES: [
    { id: 'all', name: 'All' },
    { id: 'pending', name: 'Pending' },
    { id: 'accepted', name: 'Accepted' },
    { id: 'rejected', name: 'Rejected' }
  ],

  DEPENDENTS: [
    'Wife',
    'Husband',
    'Son',
    'Daughter'
  ],

  DOCTOR_PRACTICE_TYPES: [
    { id: 'single', name: 'Single Practice' },
    { id: 'group', name: 'Group Practice' },
    { id: 'hospital', name: 'Hospital Practice' },
    { id: 'hmo', name: 'HMO' },
    { id: 'other', name: 'Other' },
  ]
};
