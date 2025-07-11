import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/api"
import toast from "react-hot-toast"

const useLoginHook = () => {
     const queryClient = useQueryClient()
  const {mutate,isPending,error} = useMutation({
    mutationFn:login,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["authUser"]})
      toast.success("Login Successful")
  }
  })
  return {error,isPending,loginMutation:mutate}
}
export default useLoginHook