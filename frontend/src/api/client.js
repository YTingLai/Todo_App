const BASE_URL = "https://localhost:7037/api";

export async function apiFetch(path, options = {}) {
    let response;

    try {
        // await : 為了在函式裡攔截 fetch() 發生的錯誤
        response = await fetch(`${BASE_URL}${path}`, options);
    } catch(error) {
        throw new Error("無法連線到伺服器");
    }

    // 判斷 HTTP Status 是否在 200 - 299 之間
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    // 因為 DELETE 方法後端回傳的是 204 No Content，所以不需要回傳 JSON
    if(options.method !== "DELETE") {
        return response.json();
    }
};