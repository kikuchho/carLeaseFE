export interface Plan {
    plan_id: number;
    contractTermLength: string;
    bonusPayment: string;
}

export interface SavedBookMark {
    id: number;
    author: number;
    carid: number;
    isupFrontFee: boolean;
    color_id: number;
    contract_year: number;
    created_at: string;
    grade_id: number;
    imgname: string;
    interior_exterior_upgrade_ids: number[];
    interior_id: number;
    numberplate_number: string;
    option_package_id: number;
    option_package_listitems: any;
    plan: Plan[];
    tire_upgrade_ids: number[];
    totalprice: number;
    updated_at: string;
}