
export const getRequest=(request,response)=>{
    response.json({ message: "GET request sent",status:"success" });
}
export const postRequest=(request,response)=>{
    response.json({ message: "POST request sent, waiting ",status:"success" });
}
export const putRequest = (request, response) => {
  response.json({ message: "PUT request sent", status: "success" });
};
