const BASE_URL = "https://localhost:7037/api";

export async function apiFetch(path, options = {}) {
    try {
        // await : 為了在函式裡攔截 fetch() 發生的錯誤
        return await fetch(`${BASE_URL}${path}`, options);
    } catch(error) {
        throw new Error("無法連線到伺服器");
    }
};