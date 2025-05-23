class ApiResponse{
    constructor(statusCode, data, meassage, success){
        this.statusCode=statusCode
        this.data=data
        this.meassage=meassage
        this.success=success
    }
}

export default ApiResponse