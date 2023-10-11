export class ApiClient {
    private readonly baseUrl: string;
    private readonly headers: any;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    async authenticate(username: string, password: string): Promise<any> {
        const requestBody = { username, password };
        console.log(this.baseUrl);
        const response = await fetch(`${this.baseUrl}/api/auth/`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: this.headers
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
        return await response.json();
    }

    async getSession (userId: string) {
        const response = await fetch(`${this.baseUrl}/api/get_token/`, {
            method: "GET",
            headers: this.headers
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
        return await response.json();
    }

    async update (data: any): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/sync/`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }

    async upsert (data: any): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/sync/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }

    async delete (data: any): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/sync/`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if(response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }
}