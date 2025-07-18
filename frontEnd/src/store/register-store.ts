import { create } from 'zustand';

// Define the store state type
interface PasswordState {
  password: string;
  setPassword: (password: string) => void;
  removePassword: () => void;
}

// Create the store with proper typing
export const usePasswordStore = create<PasswordState>((set) => ({
  password: '',
  setPassword: (password: string) => set({ password }),
  removePassword: () => set({ password: '' }),
}));


interface UsernameState {
    username: string;
    setUsername: (password: string) => void;
    removeUsername: () => void;
}

// Create the store with proper typing
export const useUsernameStore = create<UsernameState>((set) => ({
  username: '',
  setUsername: (username: string) => set({ username }),
  removeUsername: () => set({ username: '' }),
}));

// Define the customer info store state type
interface CustomerInfoState {
  // Personal information
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  
  // Birthdate
  birthdateYear: string;
  birthdateMonth: string;
  birthdateDay: string;
  
  // Gender
  gender: string;
  
  // Address
  zipCode: string;
  zipCodeFirst: string;
  zipCodeSecond: string;
  prefecture: string;
  city: string;
  address: string;
  buildingNumber: string;
  buildingName: string;
  
  // Phone
  phoneFirst: string;
  phoneSecond: string;
  phoneThird: string;

  //phone number 2 
  phonetwoFirst: string;
  phonetwoSecond: string;
  phonetwoThird: string;

  // phone number 3 
  phonethreeFirst: string;
  phonethreeSecond: string;
  phonethreeThird: string;

  //customer workplace 
  workplaceName: string;
  
  // Company info
  companyName: string;
  companyNameKana: string;

  companydepartment : string;
  companydepartmentKana : string;
  personinChargeFirstName : string;
  personinChargeLastName : string;
  personinChargeFirstNameKana : string;
  personinChargeLastNameKana : string;
  
  // Customer type
  customerType: number;
  
  // Actions
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setFirstNameKana: (firstNameKana: string) => void;
  setLastNameKana: (lastNameKana: string) => void;
  
  setBirthdateYear: (birthdateYear: string) => void;
  setBirthdateMonth: (birthdateMonth: string) => void;
  setBirthdateDay: (birthdateDay: string) => void;
  
  setGender: (gender: string) => void;
  
  setZipCode: (zipCode: string) => void;
  setZipCodeFirst: (zipCodeFirst: string) => void;
  setZipCodeSecond: (zipCodeSecond: string) => void;
  setPrefecture: (prefecture: string) => void;
  setCity: (city: string) => void;
  setAddress: (address: string) => void;
  setBuildingNumber: (buildingNumber: string) => void;
  setBuildingName: (buildingName: string) => void;
  
  setPhoneFirst: (phoneFirst: string) => void;
  setPhoneSecond: (phoneSecond: string) => void;
  setPhoneThird: (phoneThird: string) => void;

 
  setPhonetwoFirst: (phonetwoFirst: string) => void;
  setPhonetwoSecond: (phonetwoSecond: string) => void;
  setPhonetwoThird: (phonetwoThird: string) => void;

  setPhonethreeFirst: (phonethreeFirst: string) => void;
  setPhonethreeSecond: (phonethreeSecond: string) => void;
  setPhonethreeThird: (phonethreeThird: string) => void;
  
  
  setworkplaceName: (workplaceName: string) => void;

  setCompanyName: (companyName: string) => void;
  setCompanyNameKana: (companyNameKana: string) => void;
  setcompanydepartment: (companydepartment: string) => void;
  setcompanydepartmentKana: (companydepartmentKana: string) => void;
  setpersoninChargeFirstName: (personinChargeFirstName: string) => void;
  setpersoninChargeLastName: (personinChargeLastName: string) => void;
  setpersoninChargeFirstNameKana: (personinChargeFirstNameKana: string) => void;
  setpersoninChargeLastNameKana: (personinChargeLastNameKana: string) => void;



  setCustomerType: (customerType: number) => void;
  
  clearCustomerInfo: () => void;
}


export const useCustomerInfoStore = create<CustomerInfoState>((set) => ({
  // Personal information
  firstName: '',
  lastName: '',
  firstNameKana: '',
  lastNameKana: '',
  
  // Birthdate
  birthdateYear: '',
  birthdateMonth: '',
  birthdateDay: '',
  
  // Gender
  gender: '',
  
  // Address
  zipCode: '',
  zipCodeFirst: '',
  zipCodeSecond: '',
  prefecture: '',
  city: '',
  address: '',
  buildingNumber: '',
  buildingName: '',
  
  // Phone
  phoneFirst: '',
  phoneSecond: '',
  phoneThird: '',

  // Phone 2
  phonetwoFirst: '',
  phonetwoSecond: '',
  phonetwoThird: '',

  // phone number 3 
  phonethreeFirst: '',
  phonethreeSecond: '',
  phonethreeThird: '',

  // customer workplace
  workplaceName: '',
  
  // Company info
  companyName: '',
  companyNameKana: '',

  // Additional company info
  companydepartment :'',
  companydepartmentKana : '',
  personinChargeFirstName : '',
  personinChargeLastName : '',
  personinChargeFirstNameKana : '',
  personinChargeLastNameKana : '',

  // Customer type
  customerType: 0, // 0 = not selected, 1 = individual, 2 = company
  
  // Actions
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
  setFirstNameKana: (firstNameKana: string) => set({ firstNameKana }),
  setLastNameKana: (lastNameKana: string) => set({ lastNameKana }),
  
  setBirthdateYear: (birthdateYear: string) => set({ birthdateYear }),
  setBirthdateMonth: (birthdateMonth: string) => set({ birthdateMonth }),
  setBirthdateDay: (birthdateDay: string) => set({ birthdateDay }),
  
  setGender: (gender: string) => set({ gender }),
  
  setZipCode: (zipCode: string) => set({ zipCode }),
  setZipCodeFirst: (zipCodeFirst: string) => set({ zipCodeFirst }),
  setZipCodeSecond: (zipCodeSecond: string) => set({ zipCodeSecond }),
  setPrefecture: (prefecture: string) => set({ prefecture }),
  setCity: (city: string) => set({ city }),
  setAddress: (address: string) => set({ address }),
  setBuildingNumber: (buildingNumber: string) => set({ buildingNumber }),
  setBuildingName: (buildingName: string) => set({ buildingName }),
  
  setPhoneFirst: (phoneFirst: string) => set({ phoneFirst }),
  setPhoneSecond: (phoneSecond: string) => set({ phoneSecond }),
  setPhoneThird: (phoneThird: string) => set({ phoneThird }),

  setPhonetwoFirst: (phonetwoFirst: string) => set({ phonetwoFirst }),
  setPhonetwoSecond: (phonetwoSecond: string) => set({ phonetwoSecond }),
  setPhonetwoThird: (phonetwoThird: string) => set({ phonetwoThird }),

  setPhonethreeFirst: (phonethreeFirst: string) => set({ phonethreeFirst }),
  setPhonethreeSecond: (phonethreeSecond: string) => set({ phonethreeSecond }),
  setPhonethreeThird: (phonethreeThird: string) => set({ phonethreeThird }),

  setworkplaceName: (workplaceName: string) => set({ workplaceName }),
  
  setCompanyName: (companyName: string) => set({ companyName }),
  setCompanyNameKana: (companyNameKana: string) => set({ companyNameKana }),
  setcompanydepartment: (companydepartment: string) => set({ companydepartment }),
  setcompanydepartmentKana: (companydepartmentKana: string) => set({ companydepartmentKana }),
  setpersoninChargeFirstName: (personinChargeFirstName: string) => set({ personinChargeFirstName }),
  setpersoninChargeLastName: (personinChargeLastName: string) => set({ personinChargeLastName }),
  setpersoninChargeFirstNameKana: (personinChargeFirstNameKana: string) => set({ personinChargeFirstNameKana }),
  setpersoninChargeLastNameKana: (personinChargeLastNameKana: string) => set({ personinChargeLastNameKana }),
  
  setCustomerType: (customerType: number) => set({ customerType }),
  
  // Clear all data
  clearCustomerInfo: () => set({
    firstName: '',
    lastName: '',
    firstNameKana: '',
    lastNameKana: '',
    birthdateYear: '',
    birthdateMonth: '',
    birthdateDay: '',
    gender: '',
    zipCode: '',
    zipCodeFirst: '',
    zipCodeSecond: '',
    prefecture: '',
    city: '',
    address: '',
    buildingNumber: '',
    buildingName: '',
    phoneFirst: '',
    phoneSecond: '',
    phoneThird: '',
    phonetwoFirst: '',
    phonetwoSecond: '',
    phonetwoThird: '',
    phonethreeFirst: '',
    phonethreeSecond: '',
    phonethreeThird: '',
    workplaceName: '',
    companyName: '',
    companyNameKana: '',
    companydepartment :'',
    companydepartmentKana : '',
    personinChargeFirstName : '',
    personinChargeLastName : '',
    personinChargeFirstNameKana : '',
    personinChargeLastNameKana : '',
    customerType: 0,
  }),
}));