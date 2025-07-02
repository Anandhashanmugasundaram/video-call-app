import { axiosInstance } from "./axios.js";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("Error in auth", error);
    return null;
  }
};
export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboard", userData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
export const getUserFriends = async () => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const getoutGoingFriendsReq = async () => {
  const response = await axiosInstance.get("/user/outgoing-friend-request");
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
};
export async function getFriendRequests() {
  const response = await axiosInstance.get("/user/friend-request");
  return response.data;
}
export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/user/friend-request/${requestId}/accept`
  );
  return response.data;
}

export const getStreamToken = async() => {
      const response = await axiosInstance.get("/chat/token");
       return response.data;
}