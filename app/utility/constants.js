export default {
  APPOINTMENT_MINS: {
    MIN: 360, // 6AM
    MAX: 1320, // 10PM
    MAX_HOUR: 22,
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
    { id: 3, name: 'Hispanic' },
    { id: 4, name: 'Asian/Pacific Islander' },
    { id: 5, name: 'Other' }
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
