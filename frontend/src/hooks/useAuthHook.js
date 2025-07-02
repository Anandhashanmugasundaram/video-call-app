import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

const useAuthHook = () => {
  
    const authUser = useQuery({
    queryKey:["authUser"],
    queryFn:async () => getAuthUser(),
    retry:false
  })
console.log("Auth status", authUser.data);

  return {isLoading:authUser.isLoading , authUser:authUser.data?.user}
}
export default useAuthHook