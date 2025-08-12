import api from "../api";
import type { Plan, SavedBookMark } from "../types/types";

/**
 * Fetches a bookmark by ID from the API
 * @param bookmarkId The ID of the bookmark to fetch
 * @returns Promise with the bookmark data or null if not found
 */
export const getBookmark = async (bookmarkId: string): Promise<SavedBookMark | null> => {
    if (!bookmarkId || bookmarkId === "-1") return null;
    
    try {
        const res = await api.get(`/api/bookmarks/${bookmarkId}/`);
        const response = res.data;
        
        const PlanTemp: Plan[] = response.plan.map((plan: any) => ({
            plan_id: plan.plan_id || 0,
            contractTermLength: plan.contractTermLength || '0',
            bonusPayment: plan.bonusPayment || '0'
        }));

        const bookmarkData: SavedBookMark = {
            id: response.id,
            author: response.author,
            carid: response.carid,
            isupFrontFee: response.is_upFrontFee,
            color_id: response.color_id,
            contract_year: response.contract_year,
            created_at: response.created_at,
            grade_id: response.grade_id,
            imgname: response.imgname,
            interior_exterior_upgrade_ids: response.interior_exterior_upgrade_ids,
            interior_id: response.interior_id,
            numberplate_number: response.numberplate_number,
            option_package_id: response.option_package_id,
            option_package_listitems: response.option_package_listitems,
            plan: PlanTemp,
            tire_upgrade_ids: response.tire_upgrade_ids,
            totalprice: response.totalprice,
            updated_at: response.updated_at,
            
        };
        
        return bookmarkData;
    } catch (error) {
        console.log("Error fetching bookmark:", error);
        return null;
    }
};

/**
 * Deletes a bookmark by ID
 * @param id The ID of the bookmark to delete
 * @returns Promise with the deletion result
 */
export const deleteBookmark = async (id: string): Promise<boolean> => {
    try {
        const res = await api.get(`/api/bookmarks/delete/${id}/`);
        return res.status === 204;
    } catch (err) {
        console.log("Error deleting bookmark:", err);
        return false;
    }
};

/**
 * Creates a new bookmark
 * @param bookmarkData The bookmark data to create
 * @returns Promise with the creation result
 */
export const createBookmark = async (bookmarkData: any): Promise<boolean> => {
    try {
        const res = await api.post("api/bookmarks/", bookmarkData);
        return res.status === 201;
    } catch (err) {
        console.error("Error creating bookmark:", err);
        return false;
    }
};

/**
 * Fetches all bookmarks for the current user
 * @returns Promise with an array of bookmark data
 */
export const getBookmarks = async (): Promise<SavedBookMark[]> => {
    try {
        const res = await api.get('/api/bookmarks/');
        const bookmarks = res.data;
        
        // Transform each bookmark to match our SavedBookMark type
        return bookmarks.map((bookmark: any) => {
            const PlanTemp: Plan[] = bookmark.plan.map((plan: any) => ({
                plan_id: plan.plan_id || 0,
                contractTermLength: plan.contractTermLength || '0',
                bonusPayment: plan.bonusPayment || '0'
            }));

            return {
                id: bookmark.id,
                author: bookmark.author,
                carid: bookmark.carid,
                isupFrontFee: bookmark.is_upFrontFee,
                color_id: bookmark.color_id,
                contract_year: bookmark.contract_year,
                created_at: bookmark.created_at,
                grade_id: bookmark.grade_id,
                imgname: bookmark.imgname,
                interior_exterior_upgrade_ids: bookmark.interior_exterior_upgrade_ids,
                interior_id: bookmark.interior_id,
                numberplate_number: bookmark.numberplate_number,
                option_package_id: bookmark.option_package_id,
                option_package_listitems: bookmark.option_package_listitems,
                plan: PlanTemp,
                tire_upgrade_ids: bookmark.tire_upgrade_ids,
                totalprice: bookmark.totalprice,
                updated_at: bookmark.updated_at,
            };
        });
    } catch (error) {
        console.log("Error fetching bookmarks:", error);
        return [];
    }
};